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
  ({
    name,
    rootName,
    keys = [],
    data,
    expandLevel = 0,
    onCopy,
    isRoot = false,
    style,
  }) => {
    const path = keys.join('-');
    const { collapsed, toggleCollapse } = useCollapsible(
      expandLevel <= 0,
      `jsonViewer-${path}`
    );
    const collapsible = isCollapsible(data);
    const [openingBracket, closingBracket] = getBrackets(data);
    const keyClass = getKeyClass(collapsible);

    const handleCopy = () => {
      const newKeys = rootName ? [rootName, ...keys] : [...keys];

      const copyInfo = {
        keys: newKeys,
        value: data,
      };
      onCopy?.(copyInfo);
    };

    if (data === undefined)
      return (
        <div
          style={{ marginLeft: isRoot ? 0 : '20px', ...style }}
          className={styles.node}
        >
          No data to show
        </div>
      );

    return (
      <div
        style={{ marginLeft: isRoot ? 0 : '20px', ...style }}
        className={styles.node}
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
              {isRoot && rootName && (
                <span className={styles.keyName}>"{rootName}":</span>
              )}
              {!isRoot && <span className={styles.keyName}>"{name}":</span>}
              {collapsed ? (
                <>
                  {openingBracket}
                  {data && Object.values(data).length ? (
                    <span className={styles.dots}>...</span>
                  ) : null}
                  {closingBracket}
                </>
              ) : (
                openingBracket
              )}
            </span>
            {onCopy && <CopyButton handleCopy={handleCopy} />}
            {!collapsed && (
              <>
                <div>
                  {Object.entries(data as object).map(([key, val]) => (
                    <JsonNode
                      key={key}
                      name={key}
                      rootName={rootName}
                      data={val}
                      keys={[...keys, key]}
                      expandLevel={expandLevel - 1}
                      onCopy={onCopy}
                    />
                  ))}
                </div>
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
              </>
            )}
          </>
        ) : (
          <>
            {isRoot && rootName && (
              <span className={styles.keyName}>"{rootName}":</span>
            )}
            {!isRoot && <span className={keyClass}>"{name}": </span>}
            <PrimitiveValue data={data} />
            {onCopy && <CopyButton handleCopy={handleCopy} />}
          </>
        )}
      </div>
    );
  }
);
