ember-bem-helpers
==============================================================================

This addon provides [BEM](https://en.bem.info/) helpers for Ember.js applications.

No mixins, no code in the component js/ts file needed. Works with template-only components.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-bem-helpers
```


Usage
------------------------------------------------------------------------------

This addon provides two helpers out of the box: `block-name` and `bem`.

Usually you are supposed to use `block-name` once per component, on the top level of the component. However, nested usage is also supported.

Use `bem` helper everywhere you need to get a BEM class. 

Here is a basic example:

```
{{block-name "my-button"}}

<button
  class={{bem disabled=@isDisabled}}
  disabled={{@isDisabled}}
  type="button"
>
  <span class={{bem "label"}}>{{@label}}</span>
</button>
```


Defining a block outside of the component
------------------------------------------------------------------------------

You can pass a variable to the `block-name` helper like this:

```
{{block-name @externalBlockName}}
```

Why not modifier?
------------------------------------------------------------------------------

Modifiers are not run in [FastBoot](http://www.ember-fastboot.com/) and you probably want your elements to have proper classes in a server-side rendered HTML.


How does it work?
------------------------------------------------------------------------------

This addon provides AST plugin which transforms `block-name` (which is actually not a real helper) to the {{#let}}{{/let}} block with `blockName` variable and injects it as the first argument to every `bem` helper usage.

So, the above basic example is transformed to the following:

```
{{#let "my-button" as |blockName|}}
  <button
    class={{bem blockName disabled=@isDisabled}}
    disabled={{@isDisabled}}
    type="button"
  >
    <span class={{bem blockName "label"}}>{{@label}}</span>
  </button>
{{/let}}
```


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


Thanks!
------------------------------------------------------------------------------

This addon is based on the great addon [ember-cli-bem](https://github.com/nikityy/ember-cli-bem) by @nikityy.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
