import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | bem', function (hooks) {
  setupRenderingTest(hooks);

  test('block', async function (assert) {
    await render(hbs`
      {{block-name "foo"}}
      <div class={{bem}}></div>
    `);

    assert.dom('.foo').exists('Block class is correct');
  });

  test('block with modifiers', async function (assert) {
    this.set('isMod', false);

    await render(hbs`
      {{block-name "foo"}}
      <div class={{bem mod=this.isMod}}></div>
    `);

    assert.dom('.foo').doesNotHaveClass('foo--mod', 'No mod class added');

    this.set('isMod', true);
    assert.dom('.foo').hasClass('foo--mod', 'Mod class added');
  });

  test('sub-expression', async function (assert) {
    this.set('isMod', false);

    await render(hbs`
      {{block-name "foo"}}
      <div class={{concat (bem mod=this.isMod) " baz"}}></div>
    `);

    assert.dom('.foo').doesNotHaveClass('foo--mod', 'No mod class added');

    this.set('isMod', true);
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

  test('elem with modifiers', async function (assert) {
    this.set('isMod', false);

    await render(hbs`
      {{block-name "foo"}}
      <div class={{bem "bar" mod=this.isMod}}></div>
    `);

    assert
      .dom('.foo__bar')
      .doesNotHaveClass('foo__bar--mod', 'No mod class added');

    this.set('isMod', true);
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

  test('elem with non-boolean value', async function (assert) {
    this.set('depth', 0);
    await render(hbs`
      {{block-name "foo"}}
      <div class={{bem "bar" depth=this.depth}}></div>
    `);

    assert
      .dom('.foo__bar')
      .hasClass('foo__bar--depth-0', 'non-boolean modifier applied');

    this.set('depth', 4);
    assert
      .dom('.foo__bar')
      .hasClass('foo__bar--depth-4', 'non-boolean modifier updated');
  });

  test('block name defined as var', async function (assert) {
    await render(hbs`
      {{#let "foo" as |blockName|}}
        {{block-name blockName}}
        <div class={{bem}}></div>
      {{/let}}`);

    assert.dom('.foo').exists('Block class is correct');
  });

  test('undefined modifier values are filtered out', async function (assert) {
    await render(hbs`
      {{#let "foo" as |blockName|}}
        {{block-name blockName}}
        <div class={{bem mod=@modValue}}></div>
      {{/let}}`);

    assert.strictEqual(
      this.element.querySelector('.foo')?.classList.length,
      1,
      'No modifier classes were added'
    );
  });
});
