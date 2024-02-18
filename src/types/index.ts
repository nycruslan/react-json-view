export type JsonValue = unknown;

export type onCopyProps = { keys: string[]; value: JsonValue };

// Base interface for common properties
export interface JsonViewerProps {
  data: JsonValue;
  expandLevel?: number;
  rootName?: string;
  style?: React.CSSProperties;
  onCopy?: (copyInfo: onCopyProps) => void;
}

// Extends BaseJsonProps with specific properties for JsonNode
export interface JsonNodeProps extends JsonViewerProps {
  isRoot?: boolean;
  keys?: string[];
  name?: string;
}

export interface PrimitiveValueProps {
  data: JsonValue;
}
