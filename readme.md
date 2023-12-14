# regexp-misc
my small tool for Regular Expression.


## functions

### `export function getAllRegexp(text: string, regexp: RegExp): RegExpExecArray[]`
Find all regular expressions in the text, so that's each types is RegExpEcecArray.

### `separate(text: string, regexp: RegExp): (string | RegExpExecArray)[]`
Finds all regular expressions in the text, then mixes them with results that do not contain regular expressions.

Therefore, the return value is an odd-numbered array, and plain `string` and `RegExpExecArray` appear alternately.

In particular, it does not remove leading and trailing empty strings. If necessary, you will need to remove it manually.

```typescript
const s = separate('hello, <h>regexp</h> <b>world</b>!', /<.+?>(.+?)<\/.+?>/g);
console.log(s);
```
```
[
  'hello, ',
  (RegExpExecArray),
  ' ',
  (RegExpExecArray),
  '!'
]
```

### `match<T>(text: string, array: [RegExp, (found: RegExpExecArray) => T][]): T | null`
In an array of regular expressions, executes the function associated with the first matching regular expression.

You can specify the return value of a function, and then return value's type will be specified.

```typescript
const m = match('031-123-4567', [
  [/010-[0-9]{4}-[0-9]{4}/, exp => {
    return 'mobile ' + exp[0];
  }],
  [/02-([0-9]{3}-[0-9]{4})/, exp => {
    return 'seoul ' + exp[1];
  }],
  [/031-([0-9]{3}-[0-9]{4})/, exp => {
    return 'gyeonggi ' + exp[1];
  }],
]);
console.log(m);
```
```
gyeonggi 123-4567
```