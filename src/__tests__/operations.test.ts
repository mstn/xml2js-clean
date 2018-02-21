import {
  simplifyArrayValues,
  transformEnglishSingularNamesToArray,
} from '../commons';

describe('simplifyArrayValues', () => {

  it('dives into a singleton array', () => {
    expect( simplifyArrayValues(['inner']) ).toBe('inner');
  });

  it('does not apply operation if it is not a singleton', () => {
    expect( simplifyArrayValues(['inner1', 'inner2']) )
      .toMatchObject(['inner1', 'inner2']);
  });

  it('does not apply operation if it is not an array', () => {
    expect( simplifyArrayValues({a: 'text'}) )
      .toMatchObject({a: 'text'});
  });

});

describe('transformEnglishSingularNamesToArray', () => {

  it('creates an array if child key is the singular of the parent key', () => {
    expect(
      transformEnglishSingularNamesToArray({
        item: [
          'fee',
          'foe',
        ]
      }, 'items')
    ).toMatchObject([
        'fee',
        'foe',
    ]);
  });

  it('does not apply operation if child has more than one key', () => {
    expect(
      transformEnglishSingularNamesToArray({
        stub: 'foo',
        item: [
          'fee',
          'foe',
        ]
      }, 'items')
    ).toMatchObject({
      stub: 'foo',
      item: [
        'fee',
        'foe',
      ]
    });
  });

  it('does not apply operation if parent key is not the plural of child key', () => {
    expect(
      transformEnglishSingularNamesToArray({
        item: [
          'fee',
          'foe',
        ]
      }, 'parentKey')
    ).toMatchObject({
      item: [
        'fee',
        'foe',
      ]
    });
  });

  it('does not apply operation if xml is not an object', () => {
    expect(
      transformEnglishSingularNamesToArray([
        'fee',
        'foe',
      ], 'parentKey')
    ).toMatchObject([
      'fee',
      'foe',
    ]);
    expect(
      transformEnglishSingularNamesToArray('fee', 'parentKey')
    ).toBe('fee');
  });

  it('does not apply operation if parentKey is not defined', () => {
    expect(
      transformEnglishSingularNamesToArray({
        item: [
          'fee',
          'foe',
        ]
      })
    ).toMatchObject({
      item: [
        'fee',
        'foe',
      ]
    });
  });

});
