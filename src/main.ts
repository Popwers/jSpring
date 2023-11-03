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

export const animate = ({
    target,
    propriety,
    from,
    to,
    params = {},
    excepted_frames_rate = 60,
}: AnimateParams) => {
    const thereYet = (position: number, destination: number, velocity: number, errorMargin: number = 0.001) =>
        Math.abs(position - destination) < errorMargin && Math.abs(velocity) < errorMargin;

    const { stiffness = 0.5, damping = 1, mass = 10, velocity = 0 } = params;

    const frames_per_second = excepted_frames_rate || 60;
    const frame_interval = 1000 / frames_per_second;

    let previousTime = performance.now();
    let delta_time_multiplier = 1;
    let delta_time = 0;

    let position: number = from;
    let velocity_: number = velocity;

    const animationLoop = (currentTime: number) => {
        const endAnimation = thereYet(position, to, velocity_);
        if (endAnimation) {
            position = to;
            velocity_ = 0;
        } else {
            // Calculate delta time to prevent from speed variation if the frame rate is not stable
            delta_time = currentTime - previousTime;
            delta_time_multiplier = delta_time / frame_interval;

            // Calculate acceleration
            const force = (position - to) * -stiffness;
            const damper = -damping * velocity_;
            const acceleration = (force + damper) / mass;
            velocity_ += acceleration * delta_time_multiplier;
            position += velocity_ * delta_time_multiplier;

            // Save the current time for the next frame
            previousTime = currentTime;
        }

        // Update the propriety of the target
        target.style.setProperty(propriety, position + 'px');

        // If the animation is not finished, call the next frame
        !endAnimation && requestAnimationFrame(animationLoop);
    };
    requestAnimationFrame(animationLoop);
};
