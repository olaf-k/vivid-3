# Advanced

---
## Styles (Optional)

Vivid provides a set of styles (combined with the tokens and fonts) that can be used to embody the Vivid design system into an application.  

**These styles are not required by vivid components directly. However, native HTML tags do.**

- `theme.css` - Sets theme related styles

- `typography.css` - Sets typography related styles

- `all.css` - Sets all the above styles

These **core styles** rely on the [tokens and fonts to be loaded](/getting-started/quick-start/#prerequisite)

### Include the styles

To include the styles, its css files must be loaded into the project from: 

```js
'node_modules/@vonage/vivid/styles/[path to file].css';
```

Scss users can simply use [@forward](https://sass-lang.com/documentation/at-rules/forward).
```js
@forward 'node_modules/@vonage/vivid/styles/[path to file].css';
```

### Setting Vivid class

Styles **require** a `vvd-root` class selector to be present on a wrapping element. 

We advise this wrapping element to be the [:root](https://developer.mozilla.org/en-US/docs/Web/CSS/:root).

When set on the **:root HTML Element**, typeface sizes are able to descend from the root font-size, thus comply with the [WCAG 1.4.4](https://www.w3.org/WAI/WCAG21/Understanding/resize-text) to ensure text readability experience.

---

## Scoped Elements

Custom elements are registered globally by the browser. When two custom elements with the same tag name are registered on the same document, it creates a conflict that results in an error. Loading multiple versions of `vivid` is likely to cause this error as vivid elements are named the same.

Enforcing only a single version of the library to be used simultaneously makes it difficult to progressively migrate to newer versions of the library, as each update will require a full application update.
Also, in a micro-frontend architecture, this can be a major bottleneck as each micro-frontend may use a different version of the library.

To work around this limitation, Vivid provides a way for authors' to scope each custom element namespace by passing an argument to the `prefix` parameter when registering each custom element.

The following example will register *badge* custom element as `dashboard-badge`:

```js
import { registerBadge } from '@vonage/vivid';

registerBadge('dashboard');
```

Then use it as:

```html
<dashboard-badge text="dashboard scoped badge"></dashboard-badge>
```

Remember to not include the default side-effect import (`import '@vonage/vivid/button';`) when using scoped elements as it will register the default namespace.

In addition to avoiding namespace collision and customizing elements' tag names, this approach lets you enjoy the benefits of [npm dedupe](https://docs.npmjs.com/cli/v8/commands/npm-dedupe). With [npm dedupe](https://docs.npmjs.com/cli/v8/commands/npm-dedupe), only the least needed versions of the library are used in the application.

---
## Have questions?

Still looking for answers, ask us in [#ask-vivid](https://vonage.slack.com/archives/C013F0YKH99) slack channel.