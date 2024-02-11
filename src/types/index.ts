export type Primitive = string | number | boolean | null;
export interface JsonObject {
  [key: string]: JsonValue;
}
export type JsonArray = JsonValue[];
export type JsonValue = Primitive | JsonObject | JsonArray;

export interface JsonNodeProps {
  name: string;
  value: JsonValue;
}

export interface JsonViewerProps {
  data: JsonValue;
  rootName?: string; // Added rootName prop
}

export interface PrimitiveValueProps {
  value: Primitive;
}

export interface CollapsibleIndicatorProps {
  collapsed: boolean;
}
