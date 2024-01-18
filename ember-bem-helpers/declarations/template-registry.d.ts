import type bem from './helpers/bem';
import type blockName from './helpers/block-name';

export default interface EmberBemHelpersRegistry {
  bem: typeof bem;
  'block-name': typeof blockName;
}
