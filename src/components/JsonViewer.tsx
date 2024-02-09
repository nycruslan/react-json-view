import React, { useState, useCallback } from 'react';
import styles from './json-viewer.module.scss';

type Primitive = string | number | boolean | null;
interface JsonObject {
  [key: string]: JsonValue;
}
type JsonArray = JsonValue[];
type JsonValue = Primitive | JsonObject | JsonArray;

const isPrimitive = (value: JsonValue): value is Primitive =>
  value === null || ['string', 'number', 'boolean'].includes(typeof value);

const isJsonObject = (value: JsonValue): value is JsonObject =>
  typeof value === 'object' && !Array.isArray(value) && value !== null;

const PrimitiveValue: React.FC<{ value: Primitive }> = React.memo(
  ({ value }) => {
    const className = `${styles.primitiveValue} ${styles[typeof value] || ''}`;
    return <span className={className}>{JSON.stringify(value)}</span>;
  }
);

const CollapsibleIndicator: React.FC<{ collapsed: boolean }> = ({
  collapsed,
}) => (
  <span className={collapsed ? styles.arrowCollapsed : styles.arrowExpanded} />
);

const JsonNode: React.FC<{ name: string; value: JsonValue }> = React.memo(
  ({ name, value }) => {
    const [collapsed, setCollapsed] = useState(true);
    const isCollapsible = isJsonObject(value) || Array.isArray(value);
    const toggleCollapse = useCallback(() => setCollapsed(prev => !prev), []);

    return (
      <div className={styles.node}>
        <span
          className={`${styles.key} ${isCollapsible ? styles.collapsible : ''}`}
          onClick={isCollapsible ? toggleCollapse : undefined}
        >
          {isCollapsible && <CollapsibleIndicator collapsed={collapsed} />}"
          {name}":
        </span>
        {isCollapsible ? (
          collapsed ? (
            <span className={styles.collapsibleContent}>
              {Array.isArray(value) ? '[...]' : '{...}'}
            </span>
          ) : (
            <JsonViewer data={value} />
          )
        ) : (
          <PrimitiveValue value={value as Primitive} />
        )}
      </div>
    );
  }
);

const JsonViewer: React.FC<{ data: JsonValue }> = React.memo(({ data }) => {
  if (isPrimitive(data)) {
    return <PrimitiveValue value={data} />;
  }

  const entries = isJsonObject(data)
    ? Object.entries(data)
    : data.map((value, index) => [index.toString(), value]);

  return (
    <div className={styles.viewer}>
      <span className={styles.bracket}>{Array.isArray(data) ? '[' : '{'}</span>
      <div className={styles.content}>
        {entries.map(([key, value]) => (
          <JsonNode key={String(key)} name={String(key)} value={value} />
        ))}
      </div>
      <span className={styles.bracket}>{Array.isArray(data) ? ']' : '}'}</span>
    </div>
  );
});

export default JsonViewer;
