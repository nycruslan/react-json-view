import { memo, ReactElement } from 'react';
import { CollapsibleIndicator } from './CollapsibleIndicator';
import { PrimitiveValue } from './PrimitiveValue';
import { useCollapsible } from '../hooks';
import { isCollapsible, getBrackets, getKeyClass } from '../utils';
import styles from '../styles.module.scss';
import type { JsonNodeProps, Primitive } from '../types';

export const JsonNode = memo(
  ({ name, value, expandLevel = 0 }: JsonNodeProps): ReactElement => {
    const initialCollapsed = expandLevel <= 0; // Adjust for child nodes to sync with root
    const { collapsed, toggleCollapse } = useCollapsible(initialCollapsed);
    const collapsible = isCollapsible(value);
    const [openingBracket, closingBracket] = getBrackets(value);
    const keyClass = getKeyClass(collapsible);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        toggleCollapse();
        event.preventDefault();
      }
    };

    return (
      <div className={styles.node}>
        {collapsible ? (
          <>
            <span
              tabIndex={0}
              role='button'
              aria-expanded={!collapsed}
              aria-label={`${name} expandable`}
              onClick={toggleCollapse}
              onKeyDown={handleKeyDown}
              className={keyClass}
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
              <>
                <div className={styles.content}>
                  {Array.isArray(value)
                    ? value.map((item, index) => (
                        <JsonNode
                          key={index.toString()}
                          name={index.toString()}
                          value={item}
                          expandLevel={expandLevel - 1}
                        />
                      ))
                    : typeof value === 'object' && value !== null
                    ? Object.entries(value).map(([key, val]) => (
                        <JsonNode
                          key={key}
                          name={key}
                          value={val}
                          expandLevel={expandLevel - 1}
                        />
                      ))
                    : null}
                </div>
                <span
                  tabIndex={0}
                  role='button'
                  aria-label={`Collapse ${name}`}
                  onClick={toggleCollapse}
                  onKeyDown={handleKeyDown}
                  className={keyClass}
                >
                  {closingBracket}
                </span>
              </>
            )}
          </>
        ) : (
          <>
            <span className={keyClass}>"{name}": </span>
            <PrimitiveValue value={value as Primitive} />
          </>
        )}
      </div>
    );
  }
);
