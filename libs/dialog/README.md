[available on npmjs](https://www.npmjs.com/package/@ng-vibe/dialog)
# @ng-vibe/dialog

`@ng-vibe/dialog` is an advanced dialog management package for Angular 17+ applications, designed to create and manage dialogs with extensive customization and animation options. This package allows developers to effortlessly generate dialogs that can be configured with a wide range of animations, dimensions, and overlay options, providing a rich user experience without the need for manual HTML and CSS coding.

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

This package offers a powerful, dynamic way to include dialogs in Angular applications, improving the user interface and experience with minimal coding effort and maximum flexibility. It provides developers with the tools to create highly interactive and customizable dialogs that can enhance the engagement and usability of their applications.

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
### Advanced SCSS Usage

For advanced users who prefer to have direct access to the SCSS source for more granular control over the styles, `@ng-vibe/dialog` provides a SCSS file that can be integrated into your project.

1. Locate the SCSS file in the installed package directory:

   ```
   node_modules/@ng-vibe/dialog/styles/styles.scss
   ```

2. Copy this file into your project's desired location.

3. Import the copied SCSS file into your project's main SCSS file to have direct access to its mixins and variables. This allows for deeper customization and integration with your existing styles:

   ```scss
   @import 'path/to/your/copied/styles.scss';
   ```

By integrating the SCSS file directly, you gain the flexibility to override variables, utilize mixins, and harness the full power of SCSS within the context of your Angular application's styling architecture. This method is ideal for developers looking to maintain a consistent theme or apply complex style customizations to the dialog components.

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

`@ng-vibe/dialog` offers a comprehensive set of options to customize the dialog behavior and appearance:

```typescript
export interface IDialogOptions {
  width: string;
  height: string;
  minWidth: string;
  maxWidth: string;
  minHeight: string;
  maxHeight: string;
  fullScreen: boolean;
  showOverlay: boolean;
  animationIn: AppearanceAnimation;
  animationOut: DisappearanceAnimation;
}
```

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
