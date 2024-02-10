import React, { useState, useCallback, useMemo } from 'react';
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
    const valueType = value === null ? 'null' : typeof value;
    const className = `${styles.primitiveValue} ${styles[valueType] || ''}`;
    return <span className={className}>{JSON.stringify(value)}</span>;
  }
);

const CollapsibleIndicator: React.FC<{ collapsed: boolean }> = React.memo(
  ({ collapsed }) => (
    <span
      className={collapsed ? styles.arrowCollapsed : styles.arrowExpanded}
    />
  )
);

const JsonNode: React.FC<{ name: string; value: JsonValue }> = React.memo(
  ({ name, value }) => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleCollapse = useCallback(() => setCollapsed(prev => !prev), []);
    const isCollapsible = isJsonObject(value) || Array.isArray(value);

    return (
      <div className={styles.node}>
        {isCollapsible ? (
          collapsed ? (
            <span
              className={`${styles.key} ${styles.collapsible}`}
              onClick={toggleCollapse}
            >
              {isCollapsible && <CollapsibleIndicator collapsed={collapsed} />}"
              {name}":
              {Array.isArray(value) ? ' [' : ' {'}
              <span className={styles.dots}>...</span>
              {Array.isArray(value) ? ']' : '}'}
            </span>
          ) : (
            <>
              <span
                className={`${styles.key} ${styles.collapsible}`}
                onClick={toggleCollapse}
              >
                {isCollapsible && (
                  <CollapsibleIndicator collapsed={collapsed} />
                )}
                "{name}": {Array.isArray(value) ? '[' : '{'}
              </span>
              <JsonViewer data={value} isRoot={false} />
              <span
                className={`${styles.inlineClosingBracket} ${styles.key} ${styles.collapsible}`}
                onClick={toggleCollapse}
              >
                {Array.isArray(value) ? ']' : '}'}
              </span>
            </>
          )
        ) : (
          <>
            <span className={`${styles.key}`}>"{name}":</span>
            <PrimitiveValue value={value as Primitive} />
          </>
        )}
      </div>
    );
  }
);

const JsonViewer: React.FC<{ data: JsonValue; isRoot?: boolean }> = React.memo(
  ({ data, isRoot = true }) => {
    const renderContent = useMemo(() => {
      if (isPrimitive(data)) {
        return <PrimitiveValue value={data} />;
      }

      const entries = isJsonObject(data)
        ? Object.entries(data)
        : data.map((value, index) => [index.toString(), value]);

      return (
        <>
          {isRoot && (
            <span className={styles.bracket}>
              {Array.isArray(data) ? '[' : '{'}
            </span>
          )}
          <div className={styles.content}>
            {entries.map(([key, value]) => (
              <JsonNode key={String(key)} name={String(key)} value={value} />
            ))}
          </div>
          {isRoot && (
            <span className={styles.bracket}>
              {Array.isArray(data) ? ']' : '}'}
            </span>
          )}
        </>
      );
    }, [data, isRoot]);

    return <div className={styles.viewer}>{renderContent}</div>;
  }
);

export default JsonViewer;
