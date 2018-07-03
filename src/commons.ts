/**
 *  The implementation of these functions is based on the code
 *  provided in [this answer](https://stackoverflow.com/a/30947380)
 */

import {
  XmlDocument,
  isXmlArray,
  isXmlObject,
  isString,
} from './';

export function simplifyArrayValues(xml: XmlDocument) {
  if (isXmlArray(xml) && xml.length === 1) {
    return xml[0];
  }
  return xml;
}

export function transformEnglishSingularNamesToArray(
  xml: XmlDocument,
  parentKey?: string
) {
  if (isXmlObject(xml)) {
    if ( parentKey ) {
      const childrenKeys = Object.keys(xml);
      if (childrenKeys.length === 1) {
        const length = parentKey.length;

        const singulars = [
            parentKey.substring(0, length - 1),
            parentKey.substring(0, length - 3) + 'y'
        ];

        const i = singulars.indexOf(childrenKeys[0]);

        if ( i !== -1 ) {
            return xml[singulars[i]];
        }
      }
    }
  }
  return xml;
}

export function parseNumericValues(xml: XmlDocument) {
  if (isString(xml)) {
    const value = xml.trim();
    const isInteger = /^-{0,1}\d+$/;
    const isFloat = /^\d+\.\d+$/;
    if (value.match(isInteger)) {
      const intValue = parseInt(value, 10);
      if (Number.isSafeInteger(intValue)) {
        return intValue;
      }
    } else if ( value.match(isFloat) && value.length <= 15 ) {
      const floatValue = parseFloat(value);
      return floatValue;
    }
  }
  return xml;
}
