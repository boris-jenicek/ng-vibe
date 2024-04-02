[available on npmjs](https://www.npmjs.com/package/@ng-vibe/drawer)
# @ng-vibe/drawer

`@ng-vibe/drawer` is a dynamic drawer creation package for Angular 17+ applications, enabling the embedding of Angular components into beautifully animated drawers. These drawers can be configured to appear from the left, right, top, or bottom of the viewport without the need for HTML invocation, facilitating a smoother development experience.

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

### Advanced SCSS Usage

For advanced users who prefer to have direct access to the SCSS source for more granular control over the styles, `@ng-vibe/drawer` provides a SCSS file that can be integrated into your project.

1. Locate the SCSS file in the installed package directory:

   ```
   node_modules/@ng-vibe/drawer/styles/styles.scss
   ```

2. Copy this file into your project's desired location.

3. Import the copied SCSS file into your project's main SCSS file to have direct access to its mixins and variables. This allows for deeper customization and integration with your existing styles:

   ```scss
   @import 'path/to/your/copied/styles.scss';
   ```

By integrating the SCSS file directly, you gain the flexibility to override variables, utilize mixins, and harness the full power of SCSS within the context of your Angular application's styling architecture. This method is ideal for developers looking to maintain a consistent theme or apply complex style customizations to the drawer components.

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
