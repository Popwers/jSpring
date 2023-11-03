<div align="center">
  <a href="">
    <img src="./public/vite.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">jSpring</h3>

  <p align="center">A lightweight and simple engine for incorporating spring physics into your JavaScript projects.</p>
</div>

## Table of Contents

- [How to use](#how-to-use)
  - [Installation](#installation)
  - [Usage](#usage)
- [API Documentation](#api-documentation)

## How to use

### Installation

You can install jSpring Engine using npm or yarn:

```bash
npm install jspring
```
or

```bash
yarn add jspring
```

### Usage

```javascript
import Spring from 'jspring';

const spring = new Spring({
    stiffness: 100,
    damping: 10,
    mass: 1,
    velocity: 0,
    position: 0,
    toValue: 100,
    onUpdate: (value) => {
      console.log(value);
    },
    onComplete: () => {
      console.log('Spring animation completed');
    },
});
```

## API Documentation
