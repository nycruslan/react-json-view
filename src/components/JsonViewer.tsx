import { memo, ReactElement } from 'react';
import { CollapsibleIndicator } from './CollapsibleIndicator';
import { PrimitiveValue } from './PrimitiveValue';
import { useCollapsible } from '../hooks';
import { isCollapsible, getBrackets } from '../utils';
import styles from '../styles.module.scss';
import type { JsonNodeProps, JsonViewerProps, Primitive } from '../types';

const JsonNode = memo(({ name, value }: JsonNodeProps): ReactElement => {
  const { collapsed, toggleCollapse } = useCollapsible();
  const collapsible = isCollapsible(value);
  const [openingBracket, closingBracket] = getBrackets(value);

  // Determine the appropriate class for the key based on collapsibility
  const keyClass = collapsible
    ? `${styles.key} ${styles.collapsible}`
    : `${styles.key} ${styles.primitive}`;

  return (
    <div className={styles.node}>
      {collapsible ? (
        <div>
          <span
            onClick={toggleCollapse}
            className={keyClass} // Use dynamic class name
          >
            <CollapsibleIndicator collapsed={collapsed} />
            <span>"{name}": </span>
            {collapsed ? (
              <>
                {openingBracket}
                {typeof value === 'object' &&
                value !== null &&
                Object.keys(value).length ? (
                  <span className={styles.dots}>...</span>
                ) : (
                  ''
                )}
                {closingBracket}
              </>
            ) : (
              openingBracket
            )}
          </span>
          {!collapsed && (
            <div>
              <div className={styles.content}>
                {Array.isArray(value)
                  ? value.map((item, index) => (
                      <JsonNode
                        key={index.toString()}
                        name={index.toString()}
                        value={item}
                      />
                    ))
                  : typeof value === 'object' && value !== null
                  ? Object.entries(value).map(([key, val]) => (
                      <JsonNode key={key} name={key} value={val} />
                    ))
                  : null}
              </div>
              <span className={styles.key} onClick={toggleCollapse}>
                {closingBracket}
              </span>
            </div>
          )}
        </div>
      ) : (
        <>
          <span className={keyClass}>"{name}": </span>{' '}
          <PrimitiveValue value={value as Primitive} />
        </>
      )}
    </div>
  );
});

const JsonViewer = memo(
  ({ data, rootName = 'root' }: JsonViewerProps): ReactElement => {
    const { collapsed, toggleCollapse } = useCollapsible();
    const collapsible = isCollapsible(data);
    const [openingBracket, closingBracket] = getBrackets(data);

    return (
      <div className={styles.viewer}>
        <div className={styles.node}>
          {collapsible ? (
            <div>
              <span
                onClick={toggleCollapse}
                className={`${styles.key} ${styles.collapsible}`}
              >
                <CollapsibleIndicator collapsed={collapsed} />
                {rootName && `"${rootName}": `}
                {collapsed ? (
                  <>
                    {openingBracket}
                    {typeof data === 'object' &&
                    data !== null &&
                    Object.keys(data).length ? (
                      <span className={styles.dots}>...</span>
                    ) : null}
                    {closingBracket}
                  </>
                ) : (
                  openingBracket
                )}
              </span>
              {!collapsed && (
                <div>
                  <div className={styles.content}>
                    {typeof data === 'object' && data !== null
                      ? Object.entries(data).map(([key, value]) => (
                          <JsonNode key={key} name={key} value={value} />
                        ))
                      : null}
                  </div>
                  <span
                    className={`${styles.inlineClosingBracket} ${styles.key}`}
                    onClick={toggleCollapse}
                  >
                    {closingBracket}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <>
              <span className={`${styles.key} ${styles.nonCollapsible}`}>
                "{rootName}":{' '}
              </span>
              <PrimitiveValue value={data as Primitive} />
            </>
          )}
        </div>
      </div>
    );
  }
);

export default JsonViewer;
