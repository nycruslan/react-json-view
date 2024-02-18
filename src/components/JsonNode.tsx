import React, { memo } from 'react';
import { CollapsibleIndicator } from './CollapsibleIndicator';
import { PrimitiveValue } from './PrimitiveValue';
import { CopyButton } from './CopyButton';
import { useCollapsible } from '../hooks';
import {
  isCollapsible,
  getBrackets,
  getKeyClass,
  handleKeyDown,
} from '../utils';
import styles from '../styles.module.scss';
import type { JsonNodeProps } from '../types';

export const JsonNode: React.FC<JsonNodeProps> = memo(
  ({ name, keys = [], value, expandLevel = 0, onCopy, isRoot = false }) => {
    const path = keys.join('-');
    const { collapsed, toggleCollapse } = useCollapsible(
      expandLevel <= 0,
      `jsonViewer-${path}`
    );
    const collapsible = isCollapsible(value);
    const [openingBracket, closingBracket] = getBrackets(value);
    const keyClass = getKeyClass(collapsible);

    const handleCopy = () => {
      const copyInfo = { keys: isRoot ? [] : [...keys, name], value };
      onCopy?.(copyInfo);
    };

    if (value === undefined) return <p>No data to show</p>;

    return (
      <div
        style={{ marginLeft: isRoot ? 0 : '20px' }}
        className={`${styles.viewer} ${styles.node}`}
      >
        {collapsible ? (
          <>
            <span
              tabIndex={0}
              role='button'
              aria-expanded={!collapsed}
              onClick={toggleCollapse}
              onKeyDown={e => handleKeyDown(e, toggleCollapse)}
              className={keyClass}
            >
              <CollapsibleIndicator collapsed={collapsed} />
              {!isRoot && <span className={styles.keyName}>"{name}":</span>}
              {collapsed ? (
                <>
                  {openingBracket}
                  <span className={styles.dots}>...</span>
                  {closingBracket}
                </>
              ) : (
                openingBracket
              )}
            </span>
            {onCopy && <CopyButton handleCopy={handleCopy} />}
            {!collapsed && (
              <span className={styles.content}>
                {Object.entries(value as object).map(([key, val]) => (
                  <JsonNode
                    key={key}
                    name={key}
                    value={val}
                    keys={[...keys, key]}
                    expandLevel={expandLevel - 1}
                    onCopy={onCopy}
                  />
                ))}
                <span
                  tabIndex={0}
                  role='button'
                  aria-expanded={!collapsed}
                  onClick={toggleCollapse}
                  onKeyDown={e => handleKeyDown(e, toggleCollapse)}
                  className={keyClass}
                >
                  {closingBracket}
                </span>
              </span>
            )}
          </>
        ) : (
          <>
            {!isRoot && <span className={keyClass}>"{name}": </span>}
            <PrimitiveValue value={value} />
            {onCopy && <CopyButton handleCopy={handleCopy} />}
          </>
        )}
      </div>
    );
  }
);
