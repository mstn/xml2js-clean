The package [xml2js](https://www.npmjs.com/package/xml2js) converts xml to json.
In general, the problem is not easy since there are some ambiguities to be addressed.
For this reason, xml2js produces a not very clean output.

This package tries to apply some heuristics to clean xml2js output.

Heuristics should be based on some known assumptions on the underlying xml schema.

Users can define their own heuristics, too.

## Example

```javascript
cleanXml(xml, {
  operations: [ // plug in the heuristics to apply
    simplifyArrayValues,
    transformEnglishSingularNamesToArray,
    parseNumericValues,
  ]
});
```

Input

```javascript
sample: {
  title: 'fee',
  number: '2.4',
  integer: '399',
  items: {
    item: [ 'foe', 'foo' ]
  },
  entities: {
    entity: [
      { hello: 'world' },
      { hello: 'mum' },
    ]
  }
}
```

Output

```javascript
sample: {
  title: 'fee',
  number: 2.4,
  integer: 399,
  items: [ 'foe', 'foo' ],
  entities: [
    { hello: 'world' },
    { hello: 'mum' },
  ]
}
```

## Credits

The idea is discussed in [this answer](https://stackoverflow.com/a/30947380) on Stackoverflow and is implemented in [this package](https://github.com/tflanagan/node-cleanxml) by Tristian Flanagan. This package is a rewriting of his code to make it more reusable and flexible.
