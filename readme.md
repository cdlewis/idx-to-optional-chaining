# idx to optional chaining [![Build Status](https://travis-ci.com/cdlewis/idx-to-optional-chaining.svg?branch=master)](https://travis-ci.com/cdlewis/idx-to-optional-chaining)

Facebook's [idx](https://github.com/facebookincubator/idx) was a useful helper prior to the [optional chaining](https://github.com/tc39/proposal-optional-chaining) maturing as a standard because it
played nicely with Flow. But now optional chaining is stage 1 and has Flow support. This codemod
will convert transform most usages of idx.

## Usage

```console
foo@bar:~$ git clone git@github.com:cdlewis/idx-to-optional-chaining.git
foo@bar:~$ npm install -g jscodeshift
foo@bar:~$ jscodeshift -t idx-to-optional-chaining/index.js file-to-transform.js
```

## Example

Before:

```js
import idx from "idx";

let a = idx(a, _ => _.b);
let b = idx(a, _ => _.b.c);
let c = idx(a, _ => _.b.c.d);
let d = idx(a, _ => _[0][1][2]);
let e = idx(a, _ => _.b[0].c[variable]);
```

After:

```js
let a = a?.b
let b = a?.b?.c
let c = a?.b?.c?.d
let d = a?.0?.[1]?.[2]
let e = a?.b?.[0]?.c?.[variable]
```

## Known Issues
This codemod is not perfect. When a computed property access (i.e. square brackets) is the first argument, it won't be prefixed with a `?` ([Issue #5](https://github.com/cdlewis/idx-to-optional-chaining/issues/5)). All references to the object within the idx call will be removed, even if they're not an optional access ([Issue #7](https://github.com/cdlewis/idx-to-optional-chaining/issues/7)).

PRs fixing these bugs are welcome :)
