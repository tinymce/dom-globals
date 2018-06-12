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
* An easy way to deal with your new compile errors is vscode "quick fix"

# How and why

This is done in order to remove DOM globals from the namespace of a project, and import them only as necessary.

There are many advantages of this approach:

* Internal modules with the same name as DOM globals are much easier to work with
* It is immediately obvious if a module touches the DOM, and is thus subject to a risk of performance issues and side effects
* Only the necessary parts of the DOM are imported where required, so a typo doesn't lead to referencing some random DOM feature instead of a compile error

# Build process discussion

In order to make this work, the build copies the TypeScript `lib.dom.d.ts` file into the project, and makes two minor (automated) edits:

* removes the `no-default-lib` reference
* reads the namespace and generates an `export` block to make it a module.

This avoids forking the DOM library as a checked-in dependency, instead the fork is generated on demand when published. The file `legal.txt` file is updated with the version of TypeScript during the publish process