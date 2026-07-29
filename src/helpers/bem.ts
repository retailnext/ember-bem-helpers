import { helper } from '@ember/component/helper';

export default helper(function bem([blockName, elem], modifiers = {}) {
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
