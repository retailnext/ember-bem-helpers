import 'ember-source/types';
import 'ember-source/types/preview';

import '@glint/environment-ember-loose';
import '@glint/environment-ember-template-imports';

import type EmberBemHelpersRegistry from 'ember-bem-helpers/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends EmberBemHelpersRegistry {}
}
