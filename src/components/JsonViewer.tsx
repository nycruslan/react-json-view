import React, { useState, useCallback, useMemo } from 'react';
import styles from './json-viewer.module.scss';

type Primitive = string | number | boolean | null;
interface JsonObject {
  [key: string]: JsonValue;
}
type JsonArray = JsonValue[];
type JsonValue = Primitive | JsonObject | JsonArray;

interface JsonNodeProps {
  name: string;
  value: JsonValue;
}

interface JsonViewerProps {
  data: JsonValue;
  isRoot?: boolean;
}

const isPrimitive = (value: JsonValue): value is Primitive =>
  value === null || ['string', 'number', 'boolean'].includes(typeof value);

interface PrimitiveValueProps {
  value: Primitive;
}

const PrimitiveValue: React.FC<PrimitiveValueProps> = React.memo(
  ({ value }) => {
    const valueType = value === null ? 'null' : typeof value;
    const className = `${styles.primitiveValue} ${styles[valueType] || ''}`;
    return <span className={className}>{JSON.stringify(value)}</span>;
  }
);

interface CollapsibleIndicatorProps {
  collapsed: boolean;
}

const CollapsibleIndicator: React.FC<CollapsibleIndicatorProps> = React.memo(
  ({ collapsed }) => (
    <span
      className={collapsed ? styles.arrowCollapsed : styles.arrowExpanded}
    />
  )
);

interface JsonNodeProps {
  name: string;
  value: JsonValue;
}

const JsonNode: React.FC<JsonNodeProps> = React.memo(({ name, value }) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapse = useCallback(() => setCollapsed(prev => !prev), []);
  const isCollapsible = typeof value === 'object' && value !== null;

  return (
    <div className={styles.node}>
      {isCollapsible ? (
        <>
          <span
            className={`${styles.key} ${styles.collapsible}`}
            onClick={toggleCollapse}
          >
            <CollapsibleIndicator collapsed={collapsed} />"{name}":{' '}
            {collapsed ? (
              <>
                {Array.isArray(value) ? '[' : '{'}
                {Object.keys(value).length ? (
                  <span className={styles.dots}>...</span>
                ) : null}
                {Array.isArray(value) ? ']' : '}'}
              </>
            ) : Array.isArray(value) ? (
              '['
            ) : (
              '{'
            )}
          </span>
          {!collapsed && (
            <>
              <JsonViewer data={value} isRoot={false} />
              <span
                className={`${styles.inlineClosingBracket} ${styles.key}`}
                onClick={toggleCollapse}
              >
                {Array.isArray(value) ? ']' : '}'}
              </span>
            </>
          )}
        </>
      ) : (
        <>
          <span className={styles.key}>"{name}":</span>
          <PrimitiveValue value={value as Primitive} />
        </>
      )}
    </div>
  );
});

const JsonViewer: React.FC<JsonViewerProps> = React.memo(
  ({ data, isRoot = true }) => {
    const [collapsed, setCollapsed] = useState(isRoot);
    const toggleCollapse = useCallback(() => setCollapsed(prev => !prev), []);

    const renderContent = useMemo(() => {
      if (isPrimitive(data)) {
        return <PrimitiveValue value={data} />;
      }

      const entries = Object.entries(data as JsonObject | JsonArray);

      return (
        <>
          {isRoot && (
            <span
              className={`${styles.key} ${styles.collapsible}`}
              onClick={toggleCollapse}
            >
              <CollapsibleIndicator collapsed={collapsed} />
              {Array.isArray(data) ? '[' : '{'}
              {collapsed && entries.length ? (
                <span className={styles.dots}>...</span>
              ) : null}
            </span>
          )}
          {!collapsed && (
            <div className={styles.content}>
              {entries.map(([key, value]) => (
                // Convert key to string explicitly to avoid TypeScript errors
                <JsonNode
                  key={key.toString()}
                  name={key.toString()}
                  value={value}
                />
              ))}
            </div>
          )}
          {isRoot && (
            <span
              className={`${styles.inlineClosingBracket} ${styles.key} ${
                collapsed ? styles.collapsible : ''
              }`}
              onClick={toggleCollapse}
            >
              {Array.isArray(data) ? ']' : '}'}
            </span>
          )}
        </>
      );
    }, [data, isRoot, toggleCollapse, collapsed]);

    return <div className={styles.viewer}>{renderContent}</div>;
  }
);

export default JsonViewer;
