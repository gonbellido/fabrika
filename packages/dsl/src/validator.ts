import Ajv, { type ValidateFunction } from "ajv";
import addFormats from "ajv-formats";
import type { ComponentDSL } from "./types.js";
import componentSchema from "./component-v1.schema.json" with { type: "json" };

const ajv = new Ajv({ allErrors: true, allowUnionTypes: true });
addFormats(ajv);

let _validate: ValidateFunction<ComponentDSL> | null = null;

function getValidator(): ValidateFunction<ComponentDSL> {
  if (!_validate) {
    _validate = ajv.compile<ComponentDSL>(componentSchema);
  }
  return _validate;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateComponent(component: unknown): ValidationResult {
  const validator = getValidator();
  const valid = validator(component);
  const errors: string[] = [];

  if (!valid && validator.errors) {
    for (const err of validator.errors) {
      const path = err.instancePath || "/";
      errors.push(`${path}: ${err.message ?? "unknown error"}`);
    }
  }

  return { valid, errors };
}

export function assertValidComponent(component: unknown): asserts component is ComponentDSL {
  const { valid, errors } = validateComponent(component);
  if (!valid) {
    throw new Error(`Invalid DSL component:\n${errors.join("\n")}`);
  }
}
