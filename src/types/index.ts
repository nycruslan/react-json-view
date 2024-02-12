import { CSSProperties } from 'react';

export type Primitive = string | number | boolean | null;
export interface JsonObject {
  [key: string]: JsonValue;
}
export type JsonArray = JsonValue[];
export type JsonValue = Primitive | JsonObject | JsonArray;

export interface JsonNodeProps {
  name: string;
  value: JsonValue;
  expandLevel: number;
  keys?: string[];
  onCopy?: (info: { keys: string[]; value: JsonValue }) => void; // Added line
}

export interface JsonViewerProps {
  data: JsonValue;
  rootName?: string;
  style?: CSSProperties;
  expandLevel?: number;
  copy?: boolean;
  onCopy?: (info: { keys: string[]; value: JsonValue }) => void; // Added line
}

export interface PrimitiveValueProps {
  value: Primitive;
}

export interface CollapsibleIndicatorProps {
  collapsed: boolean;
}
