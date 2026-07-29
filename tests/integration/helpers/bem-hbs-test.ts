import { module, test } from 'qunit';
import { setupRenderingTest } from 'test-app/tests/helpers';
import type { TestContext } from '@ember/test-helpers';
import { find, render, rerender } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { tracked } from '@glimmer/tracking';

class State {
  @tracked isMod = false;
  @tracked depth = 0;
}

interface CurrentTestContext extends TestContext {
  state: State;
}

module('Integration | Helper | bem hbs', function (hooks) {
  setupRenderingTest(hooks);

  test('block', async function (assert) {
    await render(hbs`
      {{block-name "foo"}}
      <div class={{(bem)}}></div>
    `);

    assert.dom('.foo').exists('Block class is correct');
  });

  test('block with modifiers', async function (this: CurrentTestContext, assert) {
    this.state = new State();

    await render<CurrentTestContext>(hbs`
      {{block-name "foo"}}
      {{#let this.state.isMod as |modValue|}}
        <div class={{bem mod=modValue}}></div>
      {{/let}}
    `);

    assert.dom('.foo').doesNotHaveClass('foo--mod', 'No mod class added');

    this.state.isMod = true;
    await rerender();

    assert.dom('.foo').hasClass('foo--mod', 'Mod class added');
  });

  test('sub-expression', async function (this: CurrentTestContext, assert) {
    this.state = new State();

    await render<CurrentTestContext>(hbs`
      {{block-name "foo"}}
      <div class={{concat (bem mod=this.state.isMod) " baz"}}></div>
    `);

    assert.dom('.foo').doesNotHaveClass('foo--mod', 'No mod class added');

    this.state.isMod = true;
    await rerender();

    assert.dom('.foo').hasClass('foo--mod', 'Mod class added');
    assert.dom('.foo').hasClass('baz', 'Concatenated class is there');
  });

  test('elem', async function (assert) {
    await render(hbs`
      {{block-name "foo"}}
      <div class={{bem "bar"}}></div>
    `);

    assert.dom('.foo__bar').exists('Block class is correct');
  });

  test('elem with modifiers', async function (this: CurrentTestContext, assert) {
    this.state = new State();

    await render<CurrentTestContext>(hbs`
      {{block-name "foo"}}
      <div class={{bem "bar" mod=this.state.isMod}}></div>
    `);

    assert
      .dom('.foo__bar')
      .doesNotHaveClass('foo__bar--mod', 'No mod class added');

    this.state.isMod = true;
    await rerender();
    assert.dom('.foo__bar').hasClass('foo__bar--mod', 'Mod class added');
  });

  test('elem with 3 modifiers', async function (assert) {
    await render(hbs`
      {{block-name "foo"}}
      <div class={{bem "bar" tall=true wide=true small=true}}></div>
    `);

    assert.dom('.foo__bar').hasClass('foo__bar--tall', 'Tall class added');
    assert.dom('.foo__bar').hasClass('foo__bar--wide', 'Wide class added');
    assert.dom('.foo__bar').hasClass('foo__bar--small', 'Small class added');
  });

  test('elem with non-boolean value', async function (this: CurrentTestContext, assert) {
    this.state = new State();

    await render<CurrentTestContext>(hbs`
      {{block-name "foo"}}
      <div class={{bem "bar" depth=this.state.depth}}></div>
    `);

    assert
      .dom('.foo__bar')
      .hasClass('foo__bar--depth-0', 'non-boolean modifier applied');

    this.state.depth = 4;
    await rerender();

    assert
      .dom('.foo__bar')
      .hasClass('foo__bar--depth-4', 'non-boolean modifier updated');
  });

  test('block name defined as var', async function (assert) {
    await render(hbs`
      {{#let "foo" as |blockName|}}
        {{block-name blockName}}
        <div class={{(bem)}}></div>
      {{/let}}`);

    assert.dom('.foo').exists('Block class is correct');
  });

  test('undefined modifier values are filtered out', async function (assert) {
    await render(hbs`
      {{#let "foo" as |blockName|}}
        {{block-name blockName}}
        <div class={{bem mod=undefined}}></div>
      {{/let}}`);

    assert.strictEqual(
      find('.foo')?.classList.length,
      1,
      'No modifier classes were added',
    );
  });
});
