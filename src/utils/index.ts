import type { JsonValue } from '../types';

export const isCollapsible = (value: JsonValue): boolean =>
  typeof value === 'object' && value !== null;

export const getBrackets = (value: JsonValue): [string, string] =>
  Array.isArray(value) ? ['[', ']'] : ['{', '}'];
