[available on npmjs](https://www.npmjs.com/package/@ng-vibe/drawer)
# @ng-vibe/drawer

`@ng-vibe/drawer` is a dynamic drawer creation package for Angular 17+ applications, enabling the embedding of Angular components into beautifully animated drawers. These drawers can be configured to appear from the left, right, top, or bottom of the viewport without the need for HTML invocation, facilitating a smoother development experience.

## Features

- Dynamically generate drawers without the necessity for HTML templates.
- Flexible positioning options (left, right, top, bottom) for drawer display.
- Seamless integration with Angular 17+ applications.
- Customization options to suit various needs.
- Ability to control the drawer from within the child component via `DrawerRemoteControl`.
- Optional payload sending and receiving for enhanced component interaction.
- Comprehensive `DrawerService` for advanced drawer management.

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
import { DrawerInit, DrawerPosition } from '@ng-vibe/drawer';

export class AppComponent {
  private drawer: DrawerInit = DrawerInit(DummyComponent);

  openDrawer(optionalPayload) {
    this.drawer.options = {
      position: DrawerPosition.RIGHT, // Options: LEFT, RIGHT, TOP, BOTTOM
      isOverlay: false,
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

#### Controlling the Drawer from a Child Component

Gain control over the drawer and interact with optional payloads within the child component using `DrawerRemoteControl`:

```javascript
import { DrawerRemoteControl, inject } from '@ng-vibe/drawer';

export class DummyComponent {
  drawerRemoteControl: DrawerRemoteControl = inject(DrawerRemoteControl);

  constructor() {
    console.log('Payload received:', this.drawerRemoteControl.payload);
  }

  close(withPayload) {
    this.drawerRemoteControl.closeDrawer(withPayload);
  }
}
```

This approach allows for the sending of optional payloads between the parent and child components, enhancing the interaction capabilities. Subscription to responses from the child component is straightforward and automatically managed.

### Configuration Options

`@ng-vibe/drawer` provides a set of configurable options to customize the drawer behavior:

```typescript
export interface IDrawerOptions {
  width?: string;
  height?: string;
  position?: DrawerPosition;
  isOverlay?: boolean;
}
```

### Advanced Drawer Management

`@ng-vibe/drawer` includes a `DrawerService` for advanced management of drawer states, allowing for operations such as querying drawer states, obtaining specific drawer controls, and closing all drawers programmatically. This service offers a higher level of control for complex applications.
