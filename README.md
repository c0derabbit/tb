# Tinybird NYC taxi trip data exploration

## Setup

Run `yarn` to install dependencies needed to run the project locally. Dependencies are strictly related to bundling and serving the project, and could have been left out — it’s just nicer to be able to write modern JS without regard to browser compatibility (although most modern browsers should be able to handle them, see [ES9 Spread operator on Can I use](https://caniuse.com/?search=spread)).

## Development

Dev server is rudimentary, running `yarn dev` will start rollup in watch mode and start serving on `http://localhost:3000`, but there’s no hot reloading, so you’ll have to refresh the page manually.

> For bigger projects, I would opt for a solution capable of hot reloading, such as Webpack (or a framework).

### Testing

Tests can be run using `yarn test`. I’ve chosen Jest, but if the no dependencies restriction also applied to testing, I would have done something silimar to [this](https://github.com/c0derabbit/aoc/blob/main/2019/test.js) simple test runner I’ve written for Advent of Code, with some improvements and documentation.

## Prod build

`yarn build`

## Decisions and possible improvements

### Web components

I’ve chosen web components primarily for two reasons:  
1. They are a good way of separation of concerns, without having to rely on frameworks or templating libraries
2. I haven’t worked with them and wanted to give them a try.

### Code organisation
To avoid long files in the source code, I’ve broken up some web components into smaller sub-components. Having had more time, I would have made use of templates and slots, which would probably have made markup cleaner.

### Communication between components

This is primarily used for status messages, which are only error messages for now. Based on [this article](https://pineco.de/creating-a-javascript-event-bus/), an event bus is attached to `window` and can handle global events. This way, components can emit or listen to events and update accordingly.

#### Showing error messages

Any component can dispatch an error message like so (and it is recommended when dealing with async calls):
```js
async someFn() {
  try {
    await doSomething()
  } catch (error) {
    window.EventBus.dispatchEvent('error', { error })
  }
```
The second, `{ error }` param is optional but recommended, as it gives more info about what went wrong. If not passed, a generic message will be shown.

### Security

API authentication is via a token, which, in a production environment, would be a secret, which I would keep in `.env`, and keep out of version control. Given that this is a sample project with a token publicly available on your website, I did not make these precautions.

### Why not TypeScript?
The task said vanilla JS — otherwise I’d have chosen TS.

### Notable findings (aka, stuff I didn’t know)

SVGs can’t be created using `document.createElement`, they should be created using `document.createElementNS` instead, because `createElement` would create a HTML element, not a SVG element (see [here](https://webhint.io/docs/user-guide/hints/hint-create-element-svg/)).
