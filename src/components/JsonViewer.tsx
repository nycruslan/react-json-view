import { KeyboardEvent, memo, ReactElement } from 'react';
import { CollapsibleIndicator } from './CollapsibleIndicator';
import { PrimitiveValue } from './PrimitiveValue';
import { JsonNode } from './JsonNode';
import { useCollapsible } from '../hooks';
import {
  isCollapsible,
  getBrackets,
  getKeyClass,
  handleKeyDown,
  handleCopy,
} from '../utils';
import styles from '../styles.module.scss';
import type { JsonViewerProps, Primitive } from '../types';
import { CopyButton } from './CopyButton';

const JsonViewer = memo(
  ({
    data,
    rootName = 'root',
    style,
    expandLevel = 0,
    copy = false, // Default to false
  }: JsonViewerProps): ReactElement => {
    const initialCollapsed = expandLevel < 1;
    const { collapsed, toggleCollapse } = useCollapsible(
      initialCollapsed,
      `jsonViewer-${rootName}`
    );
    const collapsible = isCollapsible(data);
    const [openingBracket, closingBracket] = getBrackets(data);
    const keyClass = getKeyClass(collapsible);

    return (
      <div style={style} className={`${styles.viewer} ${styles.node}`}>
        {collapsible ? (
          <>
            <span
              tabIndex={0}
              role='button'
              aria-expanded={!collapsed}
              aria-label={`${rootName} expandable`}
              onClick={toggleCollapse}
              onKeyDown={(e: KeyboardEvent<HTMLDivElement>) =>
                handleKeyDown(e, toggleCollapse)
              }
              className={keyClass}
            >
              <CollapsibleIndicator collapsed={collapsed} />
              {rootName}:{' '}
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
            {copy && (
              <CopyButton
                handleCopy={() => handleCopy({ name: rootName, value: data })}
              />
            )}
            {!collapsed && (
              <div
                className={styles.content}
                aria-label={`${rootName} content`}
              >
                {typeof data === 'object' && data !== null
                  ? Object.entries(data).map(([key, value]) => (
                      <JsonNode
                        key={key}
                        name={key}
                        value={value}
                        expandLevel={expandLevel - 1}
                        copy={copy}
                      />
                    ))
                  : null}
              </div>
            )}
            {!collapsed && (
              <span
                tabIndex={0}
                role='button'
                aria-label={`Collapse ${rootName}`}
                onClick={toggleCollapse}
                onKeyDown={(e: KeyboardEvent<HTMLDivElement>) =>
                  handleKeyDown(e, toggleCollapse)
                }
                className={keyClass}
              >
                {closingBracket}
              </span>
            )}
          </>
        ) : (
          <>
            <span className={keyClass}>{rootName}: </span>
            <PrimitiveValue value={data as Primitive} />
          </>
        )}
      </div>
    );
  }
);

export default JsonViewer;
