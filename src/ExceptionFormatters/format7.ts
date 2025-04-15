import { ValidationError } from "class-validator";

export function formatErrors7(errors: ValidationError[], parentPath = ''): { field: string; code: string }[] {

    const flattenErrors = (validationErrors: ValidationError[], parentPath = '') => {
        const result = [] as { field: string; code: string }[];

        for (const error of validationErrors) {
            const fieldPath = parentPath ? `${parentPath}.${error.property}` : error.property;

            if (error.constraints) {
                for (const [_, message] of Object.entries(error.constraints)) {
                    result.push({
                        field: fieldPath,
                        code: message,
                    });
                }
            }

            if (error.children && error.children.length > 0) {
                result.push(...flattenErrors(error.children, fieldPath));
            }
        }

        return result;
    };

    const formattedErrors = flattenErrors(errors);
    return formattedErrors
}
