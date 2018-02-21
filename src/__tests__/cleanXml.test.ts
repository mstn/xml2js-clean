import { cleanXml } from '../';
import {
  simplifyArrayValues,
  transformEnglishSingularNamesToArray,
  parseNumericValues,
} from '../commons';

import { parseString } from 'xml2js';

import fs from 'fs';

const content = fs.readFileSync('./src/__tests__/fixtures/sample.xml');

describe('cleanXml', () => {

  it('transforms sample example', (done) => {
    parseString(content, (err, xml) => {
      const cleanedXml = cleanXml(xml, {
        operations: [
          simplifyArrayValues,
          transformEnglishSingularNamesToArray,
          parseNumericValues,
        ]
      });
      expect(cleanedXml).toMatchObject({
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
      });
      done();
    });
  });

  it('applies processor to tag names', () => {
    const xml = {
      sample: {
        fee: 'fee',
        foe: 'foe',
      }
    };
    const cleanedXml = cleanXml(xml, {
      operations: [
        simplifyArrayValues,
        transformEnglishSingularNamesToArray
      ],
      tagNameProcessor: (name: string) => name.toUpperCase()
    });
    expect(cleanedXml).toMatchObject({
       SAMPLE: {
         FEE: 'fee',
         FOE: 'foe',
       }
    })
  });

});
