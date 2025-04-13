import { RequestTimeoutException } from "@nestjs/common";

export const Timeout = (delay: number): MethodDecorator => {
    return (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: unknown[]): Promise<unknown> {
            const timeoutPromise: Promise<never> = new Promise((_, reject) => {
                setTimeout(() => {
                    reject(new RequestTimeoutException(`Request timed out after ${delay}ms`));
                }, delay);
            });
            return Promise.race([originalMethod.apply(this, args), timeoutPromise]);
        };
        return descriptor;
    };
};
