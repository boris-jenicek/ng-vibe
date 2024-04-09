[available on npmjs](https://www.npmjs.com/package/@ng-vibe/drawer)
<h1 align="center">@ng-vibe/drawer</h1>

<p align="center">
  <b>Contributors are welcomed ❤️ </b></br>
</p>

Elevate your Angular 17+ applications with fluid, customizable drawers using @ng-vibe/drawer. This library allows you to dynamically generate and manage drawer components that can slide in from any edge of the viewport—top, bottom, left, or right, offering a configuration options. Initiate and control drawers entirely through TypeScript, eliminating the need for HTML selectors and streamlining their integration into your Angular applications.


[Play with code at Stackblitz](https://stackblitz.com/edit/ng-vibe-toastify-egusyn?file=src%2Fapp%2Fdrawer%2Fdrawer.component.ts)

[![@ng-vibe/drawer](https://raw.githubusercontent.com/boris-jenicek/ng-vibe/master/promo/drawer/drawer-demo.gif)](https://github.com/boris-jenicek/ng-vibe/tree/main/libs/drawer)


## Features

- Dynamically generate drawers without the necessity for HTML templates.
- Flexible positioning options (left, right, top, bottom) for drawer display.
- Seamless integration with Angular 17+ applications.
- Customization options to suit various needs.
- Ability to control and manage the drawer directly from the Angular components via `DrawerRemoteControl`, including advanced functionalities like loader integration.
- Comprehensive `DrawerService` for advanced drawer management, including methods to manage drawer states.
- Featuring methods to interact with drawers programmatically, and enhance component interaction with optional payloads and loaders.

## Why

This package provides a straightforward, dynamic approach to incorporating drawers in Angular applications, enhancing user interface and experience through minimal coding and flexible interaction patterns between parent and child components.

## Getting Started

### Installation

1. Install @ng-vibe/drawer locally:

   ```bash
   npm install @ng-vibe/drawer
   ```

2. Incorporate `@ng-vibe/drawer` into your Angular module providers by importing `provideNgVibeDrawer`:

   ```typescript
   import { provideNgVibeDrawer } from '@ng-vibe/drawer';
   ...
   providers: [
     ...,
     provideNgVibeDrawer(),
   ],
   ```

3. Add the `@ng-vibe/drawer` styles to your application, either in the `angular.json`:

   ```json
   "styles": [
     "./node_modules/@ng-vibe/drawer/styles/styles.css",
     ...
   ],
   ```

   Or directly in your `styles.scss`:

   ```scss
   @import '@ng-vibe/drawer/styles/styles';
   ```

### Usage

To use `@ng-vibe/drawer` in your Angular app:

```javascript
import {DrawerRemoteControl, DrawerPosition} from '@ng-vibe/drawer';

export class AppComponent {
   private drawer: DrawerRemoteControl = DrawerRemoteControl(DialogDummyComponent);

   openDrawer(optionalPayload) {
      this.drawer.options = {
         position: DrawerPosition.RIGHT, // Options: LEFT, RIGHT, TOP, BOTTOM
         showOverlay: true,
      };
      this.drawer.openDrawer(optionalPayload).subscribe((resp) => {
         console.log('Response from child component:', resp);
      });
   }

   closeDrawer() {
      this.drawer.closeDrawer();
   }
}
```

#### Enhanced Drawer Interaction with Loader

Integrate a loading mechanism into the drawer with optional Angular component for loader customization:

```javascript
import { DrawerRemoteControl, inject } from '@ng-vibe/drawer';

export class DummyComponent {
  drawerRemoteControl: DrawerRemoteControl = inject(DrawerRemoteControl);

   openDrawer() {
    this.drawerRemoteControl.withLoader();
    //this.drawerRemoteControl.withLoader(MyCustomLoaderComponent); // Optional custom loader
    this.drawerRemoteControl.openDrawer()
    
     // simulates async code
     setTimeout(() => {
         // Can be called directly from the child component
        this.drawerRemoteControl.stopLoader(); // Call this to stop the loader and reveal the content
     }, 2000);
  }

  closeDrawer() {
    this.drawerRemoteControl.closeDrawer();
  }
}
```

### Configuration Options

`@ng-vibe/drawer` provides a set of configurable options to customize the drawer behavior:

```typescript
export interface IDrawerOptions {
  width: string;
  height: string;
  position: DrawerPosition;
  showOverlay: boolean;
}
```
### Configuration Options

`@ng-vibe/drawer` provides a set of configurable options to customize the drawer behavior:

| Option        | Description                            | Type                  |
|---------------|----------------------------------------|-----------------------|
| width         | The width of the drawer.               | `string`              |
| height        | The height of the drawer.              | `string`              |
| position      | The position of the drawer.            | `DrawerPosition`      |
| showOverlay   | Whether to show an overlay.            | `boolean`             |


### Advanced Drawer Management

`@ng-vibe/drawer` includes a `DrawerService` for advanced management of drawer states, offering methods for querying active drawers, obtaining drawer controls, and programmatically closing all drawers:

```typescript
class DrawerService {
  /**
   * An Observable that emits the count of active drawers by listening to state changes,
   * calculating the total number of active drawers.
   */
  public activeDrawersCount$: Observable<number>;

  /**
   * Retrieves the RemoteControl object associated with a specific drawer ID.
   * @param {string} id The unique identifier for the drawer.
   * @returns {DrawerRemoteControl | undefined} The RemoteControl object, if found.
   */
  public getRemoteControl(id: string): DrawerRemoteControl | undefined;

  /**
   * Returns an Observable that emits the RemoteControl object for a given drawer ID,
   * filtering out undefined states.
   * @param {string} id The unique identifier for the drawer.
   * @returns {Observable<DrawerRemoteControl | undefined>} An Observable emitting the RemoteControl object.
   */
  public selectRemoteControl$(id: string): Observable<DrawerRemoteControl | undefined>;

  /**
   * Closes all active drawers.
   */
  public closeAll(): void;
}
```
## Contributing ❤️

We welcome contributions to make @ng-vibe/drawer even better! Whether you're fixing bugs, adding new features, or improving the documentation, your help is greatly appreciated. 🌟 Check out our [contribution guidelines](https://github.com/boris-jenicek/ng-vibe/blob/main/README.md) for more information.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/boris-jenicek/ng-vibe/blob/main/LICENSE) file for details.
