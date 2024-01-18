import Helper from '@ember/component/helper';
// import { helper } from '@ember/component/helper';

export interface BemSignature {
  Args: {
    Positional: [string?];
    Named: {
      [key: string]: unknown;
    };
  };
  Return: string;
}

// declare const add = helper<BemSignature>();
// // declare const add: FunctionBasedHelper<BemSignature>;

// export default add;

export default class Bem extends Helper<BemSignature> { }
