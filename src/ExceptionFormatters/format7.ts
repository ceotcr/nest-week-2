import { ValidationError } from "class-validator";

export function formatErrors7(errors: ValidationError[], parentPath = ''): { field: string; code: string }[] {
    const formatted: { field: string; code: string }[] = [];

    for (const error of errors) {
        const field = parentPath ? `${parentPath}.${error.property}` : error.property;
        const code = error.toString().toUpperCase()

        if (error.children && error.children.length > 0) {
            formatted.push(...formatErrors7(error.children, field));
        } else {
            formatted.push({ field, code });
        }
    }

    return formatted;
}