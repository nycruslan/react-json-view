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
  rootName?: string; // Added rootName prop
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

const JsonNode: React.FC<JsonNodeProps> = React.memo(({ name, value }) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapse = useCallback(() => setCollapsed(prev => !prev), []);
  const isCollapsible = typeof value === 'object' && value !== null;
  const openingBracket = Array.isArray(value) ? '[' : '{';
  const closingBracket = Array.isArray(value) ? ']' : '}';

  return (
    <div className={styles.node}>
      {isCollapsible ? (
        <>
          <span
            onClick={toggleCollapse}
            className={`${styles.key} ${styles.collapsible}`}
          >
            <CollapsibleIndicator collapsed={collapsed} />
            <span>"{name}": </span>
            {collapsed ? (
              <>
                <span>
                  {openingBracket}
                  <span className={styles.dots}>
                    {Object.keys(value).length ? '...' : ''}
                  </span>
                  {closingBracket}
                </span>
              </>
            ) : (
              <span>{openingBracket}</span>
            )}
          </span>
          {!collapsed && (
            <div className={styles.content}>
              {Array.isArray(value)
                ? value.map((item, index) => (
                    <JsonNode
                      key={index.toString()}
                      name={index.toString()}
                      value={item}
                    />
                  ))
                : Object.entries(value).map(([key, val]) => (
                    <JsonNode key={key} name={key} value={val} />
                  ))}
            </div>
          )}
          {!collapsed && (
            <span
              className={`${styles.inlineClosingBracket} ${styles.key}`}
              onClick={toggleCollapse}
            >
              {closingBracket}
            </span>
          )}
        </>
      ) : (
        <>
          <span className={styles.key}>"{name}": </span>
          <PrimitiveValue value={value as Primitive} />
        </>
      )}
    </div>
  );
});

const JsonViewer: React.FC<JsonViewerProps> = React.memo(
  ({ data, rootName = 'root' }) => {
    const [collapsed, setCollapsed] = useState(true); // Adjusted to always start as collapsed
    const toggleCollapse = useCallback(() => setCollapsed(prev => !prev), []);

    const renderContent = useMemo(() => {
      if (isPrimitive(data)) {
        return <PrimitiveValue value={data} />;
      }

      const entries = Object.entries(data as JsonObject | JsonArray);

      return (
        <>
          <span
            className={`${styles.key} ${styles.collapsible}`}
            onClick={toggleCollapse}
          >
            <CollapsibleIndicator collapsed={collapsed} />
            {rootName ? `"${rootName}": ` : ''}
            {Array.isArray(data) ? '[' : '{'}
            {collapsed && entries.length ? (
              <span className={styles.dots}>...</span>
            ) : null}
          </span>
          {!collapsed && (
            <div className={styles.content}>
              {entries.map(([key, value]) => (
                <JsonNode
                  key={key.toString()}
                  name={key.toString()}
                  value={value}
                />
              ))}
            </div>
          )}
          <span
            className={`${styles.inlineClosingBracket} ${styles.key}`}
            onClick={toggleCollapse}
          >
            {Array.isArray(data) ? ']' : '}'}
          </span>
        </>
      );
    }, [data, rootName, toggleCollapse, collapsed]);

    return <div className={styles.viewer}>{renderContent}</div>;
  }
);

export default JsonViewer;
