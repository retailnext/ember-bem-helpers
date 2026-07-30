import { helper } from '@ember/component/helper';

interface BemSignature {
  Args: {
    Positional?: [string?];
    Named?: {
      [key: string]: string | number | boolean | undefined;
    };
  };
  Return: string;
}

export default helper<BemSignature>((positional = [], modifiers = {}) => {
  const [blockName, elem] = positional as [string?, string?];
  const className = elem ? `${blockName}__${elem}` : blockName;
  const classes = Object.entries(modifiers)
    .filter(
      ([, modifierValue]) =>
        modifierValue !== false && modifierValue !== undefined,
    )
    .map(([modifier, modifierValue]) =>
      modifierValue === true
        ? `${className}--${modifier}`
        : `${className}--${modifier}-${modifierValue}`,
    );
  return [className, ...classes].join(' ');
});
