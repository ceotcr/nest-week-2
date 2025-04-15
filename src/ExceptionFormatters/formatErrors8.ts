import { ValidationError } from "class-validator";

export function formatErrors8(validationErrors: ValidationError[], parentPath = ''): Record<string, any> {
    const result: Record<string, any> = {};

    for (const error of validationErrors) {
        const fieldPath = parentPath ? `${parentPath}.${error.property}` : error.property;

        if (error.constraints) {
            const [firstConstraint] = Object.keys(error.constraints);
            const errorMessage = error.constraints[firstConstraint];
            const context = error.contexts?.[firstConstraint];

            result[fieldPath] = {
                code: context?.code || errorMessage,
            };

            if (context?.additionalInfo) {
                const additionalInfo: Record<string, any> = context.additionalInfo;

                Object.assign(result[fieldPath], additionalInfo);
            }
        }

        if (error.children?.length) {
            Object.assign(result, formatErrors8(error.children, fieldPath));
        }
    }

    return result;
}