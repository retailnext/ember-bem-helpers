import type { FunctionBasedHelper } from '@ember/component/helper';

export interface BemSignature {
  Args: {
    Positional?: [string?];
    Named?: {
      [key: string]: unknown;
    };
  };
  Return: string;
}

declare const bem: FunctionBasedHelper<BemSignature>;
export default bem;
