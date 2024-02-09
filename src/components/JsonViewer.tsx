import React, { useCallback } from 'react';
import styles from './json-viewer.module.scss';

type Primitive = string | number | boolean | null;
type JsonValue = Primitive | { [key: string]: JsonValue } | JsonValue[];

const isPrimitive = (value: JsonValue): value is Primitive => {
  return (
    value === null || ['string', 'number', 'boolean'].includes(typeof value)
  );
};

const PrimitiveValue = React.memo<{ value: Primitive }>(({ value }) => {
  const className = `${styles.primitiveValue} ${styles[typeof value] || ''}`;
  return <span className={className}>{JSON.stringify(value)}</span>;
});

const JsonNode: React.FC<{ name: string; value: JsonValue }> = React.memo(
  ({ name, value }) => {
    const [collapsed, setCollapsed] = React.useState(true);
    const isCollapsible = typeof value === 'object' && value !== null;
    const toggleCollapse = useCallback(() => setCollapsed(prev => !prev), []);

    return (
      <div className={styles.node}>
        <span
          className={`${styles.key} ${isCollapsible ? styles.collapsible : ''}`}
          onClick={isCollapsible ? toggleCollapse : undefined}
        >
          {isCollapsible && (
            <span
              className={
                collapsed ? styles.arrowCollapsed : styles.arrowExpanded
              }
            />
          )}
          "{name}":
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

  return (
    <div className={styles.viewer}>
      <span className={styles.bracket}>{Array.isArray(data) ? '[' : '{'}</span>
      <div className={styles.content}>
        {Object.entries(data).map(([key, value]) => (
          <JsonNode key={key} name={key} value={value} />
        ))}
      </div>
      <span className={styles.bracket}>{Array.isArray(data) ? ']' : '}'}</span>
    </div>
  );
});

export default JsonViewer;
