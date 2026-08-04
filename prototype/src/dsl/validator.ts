import Ajv, { type ValidateFunction } from "ajv";
import { type ComponentDSL } from "./types";
import componentSchema from "./component-v1.schema.json";

const ajv = new Ajv({ allErrors: true, strict: true });

let validate: ValidateFunction<ComponentDSL> | null = null;

export function getValidator(): ValidateFunction<ComponentDSL> {
  if (!validate) {
    validate = ajv.compile<ComponentDSL>(componentSchema);
  }
  return validate;
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
      errors.push(`${path}: ${err.message}`);
    }
  }

  return { valid, errors };
}
