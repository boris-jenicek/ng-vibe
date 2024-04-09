[Available on npmjs](https://www.npmjs.com/package/@ng-vibe/toastify)

<h1 align="center">@ng-vibe/toastify</h1>

<p align="center">
  <b>Contributors are welcomed ❤️ </b></br>
</p>


Elevate your Angular 17+ applications with fluid, customizable toast messages using @ng-vibe/toastify. This library enables you to create various toast messages that can be positioned anywhere on the screen, offering extensive configuration options to tailor each toast to your needs. Initialize through TypeScript without the need for HTML selectors for a fluid integration into your project.



[Play with code at Stackblitz](https://stackblitz.com/edit/ng-vibe-toastify?file=src%2Fapp%2Ftoastify%2Ftoastify.component.ts)

[![@ng-vibe/toastify](https://raw.githubusercontent.com/boris-jenicek/ng-vibe/master/promo/tostify/tostify-demo.gif)](https://github.com/boris-jenicek/ng-vibe/tree/main/libs/toastify)

## Features

- **Multiple Positions:** Place your toasts at any corner of the screen or even full-width at the top or bottom.
- **Custom Animations:** Choose from a wide array of animations for both entrance and exit.
- **Flexible Configuration:** Adjust text alignment, include a progress bar, and much more.
- **No HTML Selectors:** Initialize and configure entirely through TypeScript for a clean, modular approach.
- **Support for Angular 17+:** Designed to work smoothly with the latest versions of Angular.

## Installation

1. Install @ng-vibe/toastify using npm:

   ```bash
   npm install @ng-vibe/toastify
   ```

2. Add `@ng-vibe/toastify` to your Angular module providers by importing `provideNgVibeToastify`:

   ```typescript
   import { provideNgVibeToastify } from '@ng-vibe/toastify';
   ...
   providers: [
     ...,
     provideNgVibeToastify(),
   ],
   ```

3. Incorporate the `@ng-vibe/toastify` styles into your application:

   ```json
   // In angular.json
   "styles": [
     "./node_modules/@ng-vibe/toastify/styles/styles.css",
     ...
   ],
   ```

   Or in your main styles file:

   ```scss
   // In styles.scss
   @import '@ng-vibe/toastify/styles/styles';
   ```

## Usage

To use @ng-vibe/toastify in your components, import `ToastifyRemoteControl` and initialize it:

```typescript
import { ToastifyRemoteControl } from '@ng-vibe/toastify';

private toast: ToastifyRemoteControl = new ToastifyRemoteControl();

openToast() {
  this.toast.openToast('Message!', 'Title');
}
```

### Configuring Options

Customize your toast by setting the `options` property before calling `openToast()`:

```typescript
this.toast.options = {
  text: 'Your message here!',
  title: 'Your title here',
  autoCloseDuration: 3000,
  layoutType: ToastTypeEnum.SUCCESS,
  position: ToastPosition.TOP_LEFT,
  progressBar: ProgressBar.DECREASE,
  textAlign: TextAlignEnum.START,
  animationIn: AppearanceAnimation.BOUNCE_IN,
  // additional options...
};
this.toast.openToast();
```

## Options

| Option            | Description                                         | Type            |
|-------------------|-----------------------------------------------------|-----------------|
| animationIn       | Animation type for the toast appearance.            | AppearanceAnimation |
| animationOut      | Animation type for the toast disappearance.         | DisappearanceAnimation |
| position          | Screen position of the toast.                       | ToastPosition   |
| autoCloseDuration | Duration before the toast automatically closes.     | number          |
| progressBar       | Type of progress bar displayed.                     | ProgressBar     |
| layoutType        | Type of toast based on context (success, info, etc.)| ToastTypeEnum   |
| textAlign         | Alignment of the text within the toast.             | TextAlignEnum   |
| showClose         | Whether a close button is displayed.                | boolean         |
| showIcon          | Whether an icon is displayed.                       | boolean         |
| text              | Text content of the toast.                          | string          |
| title             | Title of the toast.                                 | string          |

## Contributing

We welcome contributions to make @ng-vibe/toastify even better! Whether you're fixing bugs, adding new features, or improving the documentation, your help is greatly appreciated. 🌟 Check out our [contribution guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
