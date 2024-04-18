[available on npmjs](https://www.npmjs.com/package/@ng-vibe/service-locator)

<h1 align="center">@ng-vibe/service-locator</h1>

<p align="center">
  <b>Contributors are welcomed ❤️ </b></br>
</p>

The @ng-vibe/service-locator library addresses the limitations of Angular's dependency injection when it comes to non-service classes. It allows for smooth use of Angular’s DI system across all types of classes by implementing the Service Locator pattern.

## Features

- **Static Access to Services:** Easily retrieve instances of any registered service from anywhere in your application.
- **Dynamic Service Creation:** Support for creating new service instances on-the-fly, scoped within their own injectors.
- **Simplified Service Management:** Encapsulates Angular's Injector complexity, making service management straightforward and maintainable.

## Why

While this approach deviates from the typical Angular DI pattern, it provides a practical solution for extending dependency injection capabilities to any class within your Angular application. It's especially useful in large applications where you need to maintain clean architecture without excessively coupling your classes to Angular's components or services structure.
### How Angular's Dependency Injection Falls Short for Non-Service Classes

In Angular, dependency injection is primarily designed for services and components. However, custom classes that aren't explicitly services or components face limitations as Angular's DI can't directly inject dependencies into them. This limitation is effectively addressed by the @ng-vibe/service-locator library, which enables the use of Angular's robust DI system for all class types.

### Setting Up the Angular Service Locator

The Service Locator acts as a central hub for accessing Angular’s injector, simplifying the management of both singleton services and new service instances:

1. **Initialize the Service Locator** in your application module to ensure the Angular `Injector` is available from the start.
2. **Access Singleton Services** smoothly or **Create New Service Instances** as needed, independent of Angular's built-in DI annotations.A

## Getting Started

### Installation

1. Install @ng-vibe/service-locator locally:

   ```bash
   npm install @ng-vibe/service-locator
   ```

### Usage

To utilize the service locator in your Angular app, import and setup the service locator in your module:

```typescript
import { provideNgVibeServiceLocator } from '@ng-vibe/service-locator';

@NgModule({
  ...
  providers: [
    ...,
    provideNgVibeServiceLocator(),
  ],
  ...
})
export class AppModule {}
```

### Example Usage

Here's how you can use the service locator to manage service instances:

```typescript
import { ServiceLocator } from '@ng-vibe/service-locator';
import { LoggerDummyService } from '../services/logger-dummy.service';

export class CustomClass {
  
  constructor() {
    const loggerSingleton = ServiceLocator.getInstance(LoggerDummyService);
    const loggerNewInstance = ServiceLocator.createService(LoggerDummyService);
  }
}
```

## Configuration Options

There are no explicit configuration options needed to use `@ng-vibe/service-locator` as it utilizes Angular's existing dependency injection framework.

## Contributing ❤️

We welcome contributions to make @ng-vibe/service-locator even better! Whether you're fixing bugs, adding new features, or improving documentation, your help is greatly appreciated. 🌟 Check out our [contribution guidelines](https://github.com/boris-jenicek/ng-vibe/blob/main/README.md) for more information.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/boris-jenicek/ng-vibe/blob/main/LICENSE) file for details.
