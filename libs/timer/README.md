[available on npmjs](https://www.npmjs.com/package/@ng-vibe/timer)

<h1 align="center">@ng-vibe/timer</h1>

<p align="center">
  <b>Contributors are welcomed ❤️ </b></br>
</p>

A highly versatile timer library for Angular 17+ applications, designed to offer developers comprehensive control over timer operations, including start, pause, resume, stop, and reset functionalities. 

[Play with code at Stackblitz](https://stackblitz.com/edit/ng-vibe-toastify-gqmbef?file=src%2Fapp%2Ftimer%2Ftimer.component.ts)

[![@ng-vibe/timer](https://raw.githubusercontent.com/boris-jenicek/ng-vibe/master/promo/timer/timer-demo.gif)](https://github.com/boris-jenicek/ng-vibe/tree/main/libs/timer)


## Features

- **Flexible Timer Control**: Comprehensive API for starting, pausing, resuming, stopping, and resetting timers.
- **Callback Management**: Utilize callbacks to handle timer updates and timeouts with custom callbacks.
- **Progress and Time Reporting**: Easily retrieve timer progress, remaining time, and initial time settings in both milliseconds and seconds.
- **Customizable Update Intervals**: Define the frequency of timer updates to suit your application's needs.

## Getting Started

### Installation

1. Install `@ng-vibe/timer` locally:

   ```bash
   npm install @ng-vibe/timer
   ```

### Basic Usage

To use `@ng-vibe/timer` in your Angular project, you'll need to instantiate a `Timer` object, optionally configuring it with a desired time span and update interval. You can also attach callbacks to handle updates and timeouts:

```typescript
import { Timer } from '@ng-vibe/timer';

const timer = new Timer(5000); // 5 seconds timer

// Add update callback
timer.addOnUpdateCallback((progress, remaining) => {
  console.log(`Progress: ${progress}%, Remaining: ${remaining}%`);
});

// Add timeout callback
timer.addOnTimeoutCallback(() => {
  console.log('Timer completed!');
});

// Start the timer
timer.start();

// Stop the timer
timer.stop();

// Pause the timer
timer.pause();

// Resume the timer
timer.resume();

// Reset the timer
timer.reset();
```

### Configuration Options

Here's a summary of methods available for configuring and controlling your timer:

| Method                   | Description                                                             | Parameters                                       |
|--------------------------|-------------------------------------------------------------------------|--------------------------------------------------|
| `setMilliseconds`        | Sets the timer duration in milliseconds.                                | `milliseconds: number`                           |
| `setUpdateInterval`      | Sets the interval in milliseconds for how often the timer updates.      | `interval: number`                               |
| `start`                  | Starts the timer.                                                       | None                                             |
| `stop`                   | Stops the timer and triggers the timeout callback.                      | None                                             |
| `pause`                  | Pauses the timer.                                                       | None                                             |
| `resume`                 | Resumes the timer from the paused state.                                | None                                             |
| `reset`                  | Resets the timer to its initial state without starting it.              | None                                             |
| `getProgress`            | Returns the current progress of the timer as a percentage.              | None                                             |
| `getRemainingPercentage` | Returns the remaining time of the timer as a percentage.                | None                                             |
| `getRemainingTime`       | Returns the remaining time of the timer in milliseconds or seconds.     | `format: 'milliseconds' \| 'seconds'` (optional) |
| `getInitialTime`         | Returns the initial time setting of the timer in milliseconds or seconds.| `format: 'milliseconds' \| 'seconds'` (optional) |
| `addOnUpdateCallback`    | Adds a callback to be invoked on timer updates.                         | `callback: (progress: number, remaining: number) => void` |
| `addOnTimeoutCallback`   | Adds a callback to be invoked when the timer completes.                 | `callback: () => void`                           |

## Contributing ❤️

We welcome contributions to make @ng-vibe/timer even better! Whether you're fixing bugs, adding new features, or improving the documentation, your help is greatly appreciated. 🌟 Check out our [contribution guidelines](https://github.com/boris-jenicek/ng-vibe/blob/main/README.md) for more information.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/boris-jenicek/ng-vibe/blob/main/LICENSE) file for details.
