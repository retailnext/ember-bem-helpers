import type { FunctionBasedHelper } from '@ember/component/helper';

interface BlockNameSignature {
  Args: {
    Positional: [string];
  };
  Return: void;
}

declare const blockName: FunctionBasedHelper<BlockNameSignature>;
export default blockName;
