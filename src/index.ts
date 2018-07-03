import * as _ from 'lodash';

export interface XmlObject {
  [key: string]: XmlDocument;
}

export type XmlArray = Array<XmlObject|string>;

export type XmlDocument = XmlObject | XmlArray | string | number;

export function isXmlObject(xml: XmlDocument): xml is XmlObject {
  return _.isPlainObject(xml);
}

export function isXmlArray(xml: XmlDocument): xml is XmlArray {
  return _.isArray(xml);
}

export function isString(xml: XmlDocument): xml is string {
  return _.isString(xml);
}

export interface Operation {
  (xml: XmlDocument, parentKey?: string): XmlDocument;
}

export interface Context {
  operations: Array<Operation>;
  tagNameProcessor?(name: string): string;
}

function visitValue(
  parentKey: string | undefined,
  xml: string,
  context: Context
) {
  return xml;
}

function visitArray(
  parentKey: string | undefined,
  xml: XmlArray,
  context: Context
): XmlArray {
  return xml.map( item => visit(parentKey, item, context)) as XmlArray;
}

function visitObject(
  parentKey: string | undefined,
  xml: XmlObject,
  context: Context
) {
  const result: XmlObject = {};
  Object.keys(xml).forEach( key => {
    const processedKey =
      context.tagNameProcessor ? context.tagNameProcessor(key) : key;
    result[processedKey] = visit(
      key,
      context.operations.reduce(
        (temp, operation) => operation(temp, key), xml[key]
      ),
      context
    );
  });
  return result;
}

function visit(parentKey: string | undefined, xml: XmlDocument, context: any) {
  if (isXmlObject(xml)) {
    return visitObject(parentKey, xml, context);
  } else if (isXmlArray(xml)) {
    return visitArray(parentKey, xml, context);
  } else {
    // XXX input xml values are always strings
    return visitValue(parentKey, xml as string, context);
  }
}

export function cleanXml(xml: XmlObject, context: Context) {
  return visit(undefined, xml, context);
}
