# Description

`dom-globals` publishes the TypeScript DOM library as a module.

# Development

```
npm i
make
```

# Usage

* `npm i @ephox/dom-globals`
* remove `dom` from the `lib` array in `tsconfig.json`
* compile errors can now be quick fixed with manual imports

# How and why

This is done in order to remove DOM globals from the namespace of a project, and import them only as necessary.

There are many advantages of this approach:

* Internal modules with the same name as DOM globals are much easier to work with
* It is immediately obvious if a module touches the DOM, and is thus subject to risks of performance and side effect impact
* Only the necessary parts of the DOM are imported as required, so a typo doesn't lead to auto-completing some random DOM feature

# Build process discussion

In order to make this work, the build copies the TypeScript `lib.dom.d.ts` file into the project, and makes two minor changes:

* removes the no-default-lib reference
* adds an `export` block appended to make it a module.

This avoids forking the DOM library as a checked-in dependency, instead the fork is generated