import { helper } from '@ember/component/helper';

interface BlockNameSignature {
  Args: {
    Positional: [string];
  };
  Return: void;
}

export default helper<BlockNameSignature>(() => {});
