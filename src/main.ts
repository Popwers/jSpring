type SpringParams = {
    stiffness?: number;
    damping?: number;
    mass?: number;
    velocity?: number;
};

interface AnimateParams {
    target: HTMLElement;
    propriety: string;
    from: number;
    to: number;
    params?: SpringParams;
    excepted_frames_rate?: number;
};

const isFiniteNumber = (value: number) => typeof value === 'number' && Number.isFinite(value);

const assertValidAnimation = (from: number, to: number, params: Required<SpringParams>) => {
    const { stiffness, damping, mass, velocity } = params;
    if (!isFiniteNumber(from) || !isFiniteNumber(to)) throw new RangeError('jSpring: from and to must be finite numbers');
    if (!isFiniteNumber(velocity)) throw new RangeError('jSpring: velocity must be a finite number');
    if (!isFiniteNumber(stiffness) || stiffness <= 0) throw new RangeError('jSpring: stiffness must be greater than 0');
    if (!isFiniteNumber(damping) || damping < 0) throw new RangeError('jSpring: damping must be 0 or more');
    if (!isFiniteNumber(mass) || mass <= 0) throw new RangeError('jSpring: mass must be greater than 0');
};

export const animate = ({
    target,
    propriety,
    from,
    to,
    params = {},
    excepted_frames_rate = 60,
}: AnimateParams): (() => void) => {
    const thereYet = (position: number, destination: number, velocity: number, errorMargin: number = 0.001) =>
        Math.abs(position - destination) < errorMargin && Math.abs(velocity) < errorMargin;

    const stiffness = Number(params.stiffness ?? 0.5);
    const damping = Number(params.damping ?? 1);
    const mass = Number(params.mass ?? 10);
    const velocity = Number(params.velocity ?? 0);
    assertValidAnimation(from, to, { stiffness, damping, mass, velocity });

    const frames_per_second = excepted_frames_rate || 60;
    const frame_interval = 1000 / frames_per_second;

    let previousTime = performance.now();
    let delta_time_multiplier = 1;
    let delta_time = 0;

    let position: number = from;
    let velocity_: number = velocity;

    let frameId = 0;
    let cancelled = false;

    const animationLoop = (currentTime: number) => {
        if (cancelled) return;

        const endAnimation = thereYet(position, to, velocity_);
        if (endAnimation) {
            position = to;
            velocity_ = 0;
        } else {
            // Calculate delta time to prevent from speed variation if the frame rate is not stable
            delta_time = currentTime - previousTime;
            delta_time_multiplier = delta_time / frame_interval;

            const force = (position - to) * -stiffness;
            const damper = -damping * velocity_;
            const acceleration = (force + damper) / mass;
            velocity_ += acceleration * delta_time_multiplier;
            position += velocity_ * delta_time_multiplier;

            previousTime = currentTime;
        }

        const diverged = !Number.isFinite(position) || !Number.isFinite(velocity_);
        if (diverged) {
            position = to;
            velocity_ = 0;
        }

        target.style.setProperty(propriety, position + 'px');

        if (!endAnimation && !diverged) frameId = requestAnimationFrame(animationLoop);
    };
    frameId = requestAnimationFrame(animationLoop);

    return () => {
        cancelled = true;
        cancelAnimationFrame(frameId);
    };
};
