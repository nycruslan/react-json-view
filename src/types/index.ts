import { CSSProperties } from 'react';

export type Primitive = string | number | boolean | null;
export interface JsonObject {
  [key: string]: JsonValue;
}
export type JsonArray = JsonValue[];
export type JsonValue = Primitive | JsonObject | JsonArray;

export type onCopyProps = { keys: string[]; value: JsonValue };

export interface JsonNodeProps {
  name?: string;
  data: JsonValue;
  expandLevel?: number;
  keys?: string[];
  isRoot?: boolean;
  rootName?: string;
  style?: CSSProperties;
  onCopy?: (copyInfo: onCopyProps) => void;
}

export interface JsonViewerProps {
  data: JsonValue;
  rootName?: string;
  style?: CSSProperties;
  expandLevel?: number;
  copy?: boolean;
  onCopy?: (copyInfo: onCopyProps) => void;
}

export interface PrimitiveValueProps {
  data: JsonValue;
}

export interface CollapsibleIndicatorProps {
  collapsed: boolean;
}
