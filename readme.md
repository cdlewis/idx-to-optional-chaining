# idx to optional-chaining

Facebook's idx was a useful helper prior to the optional chaining maturing as a standard because it
played nicely with Flow. But now optional chaining is stage 1 and has Flow support. This codemod
will convert transform most usages of idx.

## Usage

```console
$ git clone git@github.com:cdlewis/idx-to-optional-chaining.git
$ npm install -g jscodeshift
$ jscodeshift -t idx-to-optional-chaining/index.js file-to-transform.js
```

## Example

Before:

```js
import idx from 'idx';

let a = idx(a, _ => _.b) 
let b = idx(a, _ => _.b.c)
let c = idx(a, _ => _.b.c.d)
let d = idx(a, _ => _[0][1][2])
let e = idx(a, _ => _.b[0].c[variable])
```

After:

```js
let a = a?.b
let b = a?.b?.c
let c = a?.b?.c?.d
let d = a?.0?.[1]?.[2]
let e = a?.b?.[0]?.c?.[variable]
```
