import type { bem, blockName } from './index.ts';

export default interface Registry {
  bem: typeof bem;
  'block-name': typeof blockName;
}
