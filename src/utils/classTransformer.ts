import {
  ClassTransformOptions,
  ClassConstructor,
  plainToClass as pTC,
} from "class-transformer";

export function plainToClass<T, V>(
  cls: ClassConstructor<T>,
  plain: V[],
  options?: ClassTransformOptions
): T[];

export function plainToClass<T, V>(
  cls: ClassConstructor<T>,
  plain: V,
  options?: ClassTransformOptions
): T;

export function plainToClass<T, V>(
  cls: ClassConstructor<T>,
  plain: V[] | V,
  options?: ClassTransformOptions
) {
  return pTC(cls, plain, { excludeExtraneousValues: true, ...options });
}
