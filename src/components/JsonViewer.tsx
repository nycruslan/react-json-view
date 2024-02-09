import React, { useState, memo } from 'react';
import styles from './json-viewer.module.scss';

type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

const PrimitiveValue: React.FC<{ value: string | number | boolean | null }> =
  memo(({ value }) => {
    let valueType = 'null';
    if (value !== null) valueType = typeof value;
    const className = `${styles.primitiveValue} ${styles[valueType]}`;

    return (
      <span className={className}>: {JSON.stringify(value, null, 2)}</span>
    );
  });

const JsonNode: React.FC<{ name: string; value: JsonValue }> = memo(
  ({ name, value }) => {
    const [collapsed, setCollapsed] = useState(true);
    const isCollapsible = typeof value === 'object' && value !== null;

    return (
      <div className={styles.node}>
        <span
          className={`${styles.key} ${
            isCollapsible ? styles.collapsible : ''
          } ${!collapsed ? styles.expanded : ''}`}
          onClick={() => isCollapsible && setCollapsed(prev => !prev)}
        >
          &quot;{name}&quot;{isCollapsible ? '' : ':'}
        </span>
        {isCollapsible ? (
          !collapsed && (
            <div className={styles.value}>
              <JsonViewer data={value} isNested />
            </div>
          )
        ) : (
          <PrimitiveValue value={value as string | number | boolean | null} />
        )}
      </div>
    );
  }
);

const JsonViewer: React.FC<{ data: JsonValue; isNested?: boolean }> = memo(
  ({ data, isNested }) => {
    if (typeof data !== 'object' || data === null) {
      return (
        <div className={styles.viewer}>
          <PrimitiveValue value={data as string | number | boolean | null} />
        </div>
      );
    }

    return (
      <div className={styles.viewer}>
        <div className={`${styles.node} ${isNested ? styles.nested : ''}`}>
          {Object.entries(data).map(([key, value]) => (
            <JsonNode key={key} name={key} value={value} />
          ))}
        </div>
      </div>
    );
  }
);

export default JsonViewer;
