# @serveside/check-source-map


```zsh
npx @serveside/check-source-map <sourcemap-filename> -l <line-number> -c <column-number>
```

----

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
