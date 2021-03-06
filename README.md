# @serveside/check-source-map


```zsh
npx @serveside/check-source-map <sourcemap-filename> -l <line-number> -c <column-number>
```

----

## Local sourcemap file

Read a sourcemap file given a line number and column number and return the line/column of the same in the source code:

For example:

```zsh
$ npx @serveside/check-source-map ~/dist/prod.b6e7359deed79be25536.js.map -l 2 -c 106543

{
  source: 'webpack://my-project/node_modules/some-module/some-file.js',
  line: 158,
  column: 52,
  name: 'someMethodName'
}
```

----

## Remote sourcemap file

Add the `-r` flag to the command

For example:

```zsh
$ npx @serveside/check-source-map https://some-website.example.com/js/prod.b6e7359deed79be25536.js.map -l 2 -c 106543 -r

{
  source: 'webpack://my-project/node_modules/some-module/some-file.js',
  line: 158,
  column: 52,
  name: 'someMethodName'
}
```

---

### Using global npm module

Run:

```zsh
npm i -g @serveside/check-source-map
```

Then can run `s-csm` instead of `npx @serveside/check-source-map`

-----
## Running programmatically

This module can also be used programmatically:

```ts
const csm = require('@serveside/check-source-map');

async function someMethod() {
  const result = await csm.readLocalSourcemap({
    source: './some_local_map.js.map',
    line: 1,
    column 134
  });

  console.log(result);
}
```

The `result` would be the same values that are echoed out by the cli.

Can also run with the same parameters for `csm.readRemoteSourcemap`.