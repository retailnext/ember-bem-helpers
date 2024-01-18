import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';
import { render, rerender } from '@ember/test-helpers';
import { bem, blockName } from 'ember-bem-helpers';
import { concat } from '@ember/helper';
import { tracked } from '@glimmer/tracking';

module('Integration | Helper | bem template tag', function (hooks) {
  setupRenderingTest(hooks);

  class State {
    @tracked isMod = false;
    @tracked depth = 0;
  }

  test('block', async function (assert) {
    await render(
      <template>
        {{blockName 'foo'}}
        <div class={{bem}}></div>
      </template>,
    );

    assert.dom('.foo').exists('Block class is correct');
  });

  test('block with modifiers', async function (assert) {
    const state = new State();
    await render(
      <template>
        {{blockName 'foo'}}
        <div class={{bem mod=state.isMod}}></div>
      </template>,
    );

    assert.dom('.foo').doesNotHaveClass('foo--mod', 'No mod class added');

    state.isMod = true;
    await rerender();

    assert.dom('.foo').hasClass('foo--mod', 'Mod class added');
  });

  test('sub-expression', async function (assert) {
    const state = new State();
    await render(
      <template>
        {{blockName 'foo'}}
        <div class={{concat (bem mod=state.isMod) ' baz'}}></div>
      </template>,
    );

    assert.dom('.foo').doesNotHaveClass('foo--mod', 'No mod class added');

    state.isMod = true;
    await rerender();

    assert.dom('.foo').hasClass('foo--mod', 'Mod class added');
    assert.dom('.foo').hasClass('baz', 'Concatenated class is there');
  });

  test('elem', async function (assert) {
    await render(
      <template>
        {{blockName 'foo'}}
        <div class={{bem 'bar'}}></div>
      </template>,
    );

    assert.dom('.foo__bar').exists('Block class is correct');
  });

  test('elem with modifiers', async function (assert) {
    const state = new State();
    await render(
      <template>
        {{blockName 'foo'}}
        <div class={{bem 'bar' mod=state.isMod}}></div>
      </template>,
    );

    assert
      .dom('.foo__bar')
      .doesNotHaveClass('foo__bar--mod', 'No mod class added');

    state.isMod = true;
    await rerender();

    assert.dom('.foo__bar').hasClass('foo__bar--mod', 'Mod class added');
  });

  test('elem with 3 modifiers', async function (assert) {
    await render(
      <template>
        {{blockName 'foo'}}
        <div class={{bem 'bar' tall=true wide=true small=true}}></div>
      </template>,
    );

    assert.dom('.foo__bar').hasClass('foo__bar--tall', 'Tall class added');
    assert.dom('.foo__bar').hasClass('foo__bar--wide', 'Wide class added');
    assert.dom('.foo__bar').hasClass('foo__bar--small', 'Small class added');
  });

  test('elem with non-boolean value', async function (assert) {
    const state = new State();
    await render(
      <template>
        {{blockName 'foo'}}
        <div class={{bem 'bar' depth=state.depth}}></div>
      </template>,
    );

    assert
      .dom('.foo__bar')
      .hasClass('foo__bar--depth-0', 'non-boolean modifier applied');

    state.depth = 4;
    await rerender();

    assert
      .dom('.foo__bar')
      .hasClass('foo__bar--depth-4', 'non-boolean modifier updated');
  });

  test('block name defined as var', async function (assert) {
    await render(
      <template>
        {{#let 'foo' as |_blockName|}}
          {{blockName _blockName}}
          <div class={{bem}}></div>
        {{/let}}
      </template>,
    );

    assert.dom('.foo').exists('Block class is correct');
  });

  test('undefined modifier values are filtered out', async function (assert) {
    await render(
      <template>
        {{#let 'foo' as |_blockName|}}
          {{blockName _blockName}}
          <div class={{bem mod=@modValue}}></div>
        {{/let}}
      </template>,
    );

    assert.strictEqual(
      this.element.querySelector('.foo')?.classList.length,
      1,
      'No modifier classes were added',
    );
  });
});
