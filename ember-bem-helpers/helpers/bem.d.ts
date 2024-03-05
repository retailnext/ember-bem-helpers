import Helper from '@ember/component/helper';

export interface BemSignature {
  Args: {
    Positional: [string?];
    Named: {
      [key: string]: unknown;
    };
  };
  Return: string;
}

export default class Bem extends Helper<BemSignature> { }
