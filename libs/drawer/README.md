[available on npmjs](https://www.npmjs.com/package/@ng-vibe/drawer)
# @ng-vibe/drawer

`@ng-vibe/drawer` is a dynamic drawer creation package for Angular 17+ applications, enabling the embedding of Angular components into beautifully animated drawers. These drawers can be configured to appear from the left, right, top, or bottom of the viewport without the need for HTML invocation, facilitating a smoother development experience.

## Features

- Dynamically generate drawers without the necessity for HTML templates.
- Flexible positioning options (left, right, top, bottom) for drawer display.
- Seamless integration with Angular 17+ applications.
- Customization options to suit various needs.
- Ability to control the drawer from within the child component via `DrawerRemoteControl`.

## Why

This package provides a straightforward, dynamic approach to incorporating drawers in Angular applications, enhancing user interface and experience through minimal coding.

## Getting Started

### Installation

1. Install @ng-vibe/drawer locally:

   ```bash
   npm install @ng-vibe/drawer
   ```

2. Incorporate `@ng-vibe/drawer` into your Angular module providers by importing `provideNgVibeDrawer`:

   ```javascript
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
import { DrawerInitializer, DrawerPosition } from '@ng-vibe/drawer';

export class AppComponent {
  private drawer: DrawerInitializer = new DrawerInitializer();

  openDrawer() {
    this.drawer.options = {
      position: DrawerPosition.RIGHT, // Options: LEFT, RIGHT, TOP, BOTTOM
      isOverlay: false,
    };
    this.drawer.openDrawer(DummyComponent);
  }

  closeDrawer() {
    this.drawer.closeDrawer();
  }
}
```

#### Controlling the Drawer from a Child Component

Gain control over the drawer within the child component using `DrawerRemoteControl`:

```javascript
import { DrawerRemoteControl, inject } from '@ng-vibe/drawer';

export class DummyComponent {
  private drawerRemoteControl: DrawerRemoteControl =
    inject(DrawerRemoteControl);

  close(): void {
    this.drawerRemoteControl.closeDrawer();
  }
}
```

By injecting `DrawerRemoteControl`, the child component gains the ability to manage the drawer, such as closing it when necessary, thereby providing a versatile and interactive component management experience.
