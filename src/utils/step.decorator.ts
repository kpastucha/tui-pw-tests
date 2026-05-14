import { test } from '@playwright/test';

/**
 * A class method decorator that automatically wraps the method execution inside a native Playwright step (`test.step`).
 * Supports dynamic injection of method arguments into the step name template and handles automated
 * serialization of objects and arrays using `JSON.stringify`.
 *
 * @param {string} [stepTemplate] - Optional step name template containing `{placeholder}` tokens.
 * Arguments are replaced sequentially based on their position in the method signature.
 * If omitted, the step name defaults to the fully qualified method path: `ClassName.methodName`.
 *
 * @example
 * ```typescript
 * import { step } from './step.decorator';
 *
 * interface PassengerData {
 *   firstName: string;
 *   lastName: string;
 * }
 *
 * class SearchPage {
 *   // 1. Basic usage with primitive types (string interpolation):
 *   // Output step name: "Searching for holidays to: Maldives"
 *   @step("Searching for holidays to: {destination}")
 *   async search(destination: string) {
 *     // method implementation
 *   }
 *
 *   // 2. Complex usage with objects (automatic JSON serialization):
 *   // Output step name: "Filling passenger details: {\n  "firstName": "John",\n  "lastName": "Doe"\n}"
 *   @step("Filling passenger details: {passengerData}")
 *   async fillForm(passengerData: PassengerData) {
 *     // method implementation
 *   }
 *
 *   // 3. Usage without a template (resolves automatically to "SearchPage.open"):
 *   // Output step name: "SearchPage.open"
 *   @step()
 *   async open() {
 *     // method implementation
 *   }
 * }
 * ```
 */
export function step(stepTemplate?: string) {
  return function <T, A extends unknown[]>(
    target: (this: unknown, ...args: A) => Promise<T>,
    context: ClassMethodDecoratorContext
  ) {
    return async function (this: unknown, ...args: A): Promise<T> {
      const className =
        typeof this === 'function'
          ? this.name
          : ((this as object)?.constructor?.name ?? 'UnknownClass');
      const methodDetails = `${className}.${context.name.toString()}`;
      const stepName = stepTemplate ? replacePlaceholders(stepTemplate, args) : methodDetails;
      return await test.step(stepName, async () => {
        return await target.call(this, ...args);
      });
    };
  };
}

/**
 * Helper function to sequentially replace `{...}` placeholders in a string template
 * with the actual values of the arguments intercepted during the method call.
 *
 * @param {string} template - The step name string template (e.g., "Child age: {age}").
 * @param {unknown[]} args - Array of arguments captured during the method execution.
 * @returns {string} The formatted step name with injected and serialized values.
 */
function replacePlaceholders(template: string, args: unknown[]): string {
  let result = template;
  for (const value of args) {
    const formattedValue =
      typeof value === 'object' && value !== null
        ? JSON.stringify(value, null, 2)
        : String(value ?? 'null');
    if (result.includes('{')) {
      result = result.replace(/{[a-zA-Z0-9_]+}/, formattedValue);
    }
  }
  return result;
}
