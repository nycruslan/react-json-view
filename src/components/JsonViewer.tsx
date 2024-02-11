import { memo, ReactElement } from 'react';
import { CollapsibleIndicator } from './CollapsibleIndicator';
import { PrimitiveValue } from './PrimitiveValue';
import { useCollapsible } from '../hooks';
import { isCollapsible, getBrackets } from '../utils';
import styles from '../styles.module.scss';
import type { JsonViewerProps, Primitive } from '../types';
import { JsonNode } from './JsonNode';

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
