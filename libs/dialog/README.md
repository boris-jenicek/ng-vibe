[available on npmjs](https://www.npmjs.com/package/@ng-vibe/dialog)
<h1 align="center">@ng-vibe/dialog</h1>

<p align="center">
  <b>Contributors are welcomed ❤️ </b></br>
</p>
Elevate your Angular 17+ applications with dynamic, customizable dialogs using @ng-vibe/dialog. This library allows you to smoothly create and manage dialog components, offering extensive configuration options for dimensions, animations, overlays, and more. Initiate and control dialogs entirely through TypeScript, eliminating the need for HTML selectors and enhancing their integration into your Angular applications.


[Play with code at Stackblitz](https://stackblitz.com/edit/ng-vibe-toastify-wfnjsx?file=src%2Fapp%2Fdialog%2Fdialog.component.ts)

[![@ng-vibe/drawer](https://raw.githubusercontent.com/boris-jenicek/ng-vibe/master/promo/dialog/dialog-demo.gif)](https://github.com/boris-jenicek/ng-vibe/tree/main/libs/dialog)



## Features

- Dynamically generate dialogs without the need for HTML templates.
- Extensive configuration options including width, height, minimum and maximum dimensions, full-screen mode, and overlay visibility.
- A broad set of entrance and exit animations to choose from, enhancing the user interaction.
- Seamless integration with Angular 17+ applications.
- Customization options to tailor dialog appearance and behavior to specific needs.
- Ability to control and manage the dialog directly from Angular components via `DialogRemoteControl`, including functionalities like loader integration.
- Comprehensive `DialogService` for advanced dialog management.
- Featuring methods to manage dialog states, interact with dialogs programmatically, and facilitate component interaction with optional payloads and loaders.

## Why

@ng-vibe/dialog enhances Angular applications by offering a powerful, dynamic means to include highly interactive and customizable dialogs. It aids in enriching user interfaces and experiences with minimal coding effort, granting developers the flexibility to craft engaging and responsive modals and pop-ups.

## Getting Started

### Installation

1. Install @ng-vibe/dialog locally:

   ```bash
   npm install @ng-vibe/dialog
   ```

2. Incorporate `@ng-vibe/dialog` into your Angular module providers by importing `provideNgVibeDialog`:

   ```typescript
   import { provideNgVibeDialog } from '@ng-vibe/dialog';
   ...
   providers: [
     ...,
     provideNgVibeDialog(),
   ],
   ```

3. Add the `@ng-vibe/dialog` styles to your application, either in the `angular.json`:

   ```json
   "styles": [
     "./node_modules/@ng-vibe/dialog/styles/styles.css",
     ...
   ],
   ```

   Or directly in your `styles.scss`:

   ```scss
   @import '@ng-vibe/dialog/styles/styles';
   ```

### Usage

To use `@ng-vibe/dialog` in your Angular app:

```javascript
import {DialogRemoteControl, AppearanceAnimation, DisappearanceAnimation} from '@ng-vibe/dialog';

export class AppComponent {
   private dialog: DialogRemoteControl = DialogRemoteControl(DialogDummyComponent);

   openDialog(optionalPayload) {
      this.dialog.options = {
         width: '500px',
         height: '300px',
         showOverlay: true,
         animationIn: AppearanceAnimation.ZOOM_IN,
         animationOut: DisappearanceAnimation.ZOOM_OUT,
      };
      this.dialog.openDialog(optionalPayload).subscribe((resp) => {
         console.log('Response from dialog content:', resp);
      });
   }

   closeDialog() {
      this.dialog.closeDialog();
   }
}
```

#### Enhanced Dialog Interaction with Loader

Integrate a loading mechanism into the dialog with optional Angular component for loader customization:

```javascript
import { DialogRemoteControl, inject } from '@ng-vibe/dialog';

export class DummyComponent {
  dialogRemoteControl: DialogRemoteControl = inject(DialogRemoteControl);

   openDialog() {
    this.dialogRemoteControl.withLoader();
    // Optional custom loader: this.dialogRemoteControl.withLoader(MyCustomLoaderComponent);
    this.dialogRemoteControl.openDialog()
    
     // Simulates asynchronous operations
     setTimeout(() => {
        this.dialogRemoteControl.stopLoader(); // Call this to stop the loader and reveal the content
     }, 2000);
  }

  closeDialog() {
    this.dialogRemoteControl.closeDialog();
  }
}
```

### Configuration Options

Dialogs can be finely tuned with various options for a personalized appearance and behavior. Here's a table summarizing the configuration options available:

| Option          | Description                                       | Type                  |
|-----------------|---------------------------------------------------|-----------------------|
| `width`         | Set the dialog width                              | `string`              |
| `height`        | Set the dialog height                             | `string`              |
| `minWidth`      | Minimum width of the dialog                       | `string`              |
| `maxWidth`      | Maximum width the dialog can expand to            | `string`              |
| `minHeight`     | Minimum height of the dialog                      | `string`              |
| `maxHeight`     | Maximum height the dialog can expand to           | `string`              |
| `fullScreen`    | Whether the dialog should be displayed full-screen| `boolean`             |
| `showOverlay`   | Whether to show an overlay behind the dialog      | `boolean`             |
| `animationIn`   | Entrance animation                                | `AppearanceAnimation` |
| `animationOut`  | Exit animation                                    | `DisappearanceAnimation` |


### Advanced Dialog Management

`@ng-vibe/dialog` includes a `DialogService` for the advanced management of dialog states, providing methods for querying active dialogs, obtaining dialog controls, and programmatically closing all dialogs:

```typescript
class DialogService {
  /**
   * An Observable that emits the count of active dialogs by listening to state changes,
   * calculating the total number of active dialogs.
   */
  public activeDialogsCount$: Observable<number>;

  /**
   * Retrieves the RemoteControl object associated with a specific dialog ID.
   * @param {string} id The unique identifier for the dialog.
   * @returns {DialogRemoteControl | undefined} The RemoteControl object, if found.
   */
  public getRemoteControl(id: string): DialogRemoteControl | undefined;

  /**
   * Returns an Observable that emits the RemoteControl object for a given dialog ID,
   * filtering out undefined states.
   * @param {string} id The unique identifier for the dialog.
   * @returns {Observable<DialogRemoteControl | undefined>} An Observable emitting the RemoteControl object.
   */
  public selectRemoteControl$(id: string): Observable<DialogRemoteControl | undefined>;

  /**
   * Closes all active dialogs.
   */
  public closeAll(): void;
}
```
## Contributing ❤️

We welcome contributions to make @ng-vibe/dialog even better! Whether you're fixing bugs, adding new features, or improving the documentation, your help is greatly appreciated. 🌟 Check out our [contribution guidelines](https://github.com/boris-jenicek/ng-vibe/blob/main/README.md) for more information.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/boris-jenicek/ng-vibe/blob/main/LICENSE) file for details.
