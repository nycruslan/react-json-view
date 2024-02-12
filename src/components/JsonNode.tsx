import { KeyboardEvent, memo, ReactElement } from 'react';
import { CollapsibleIndicator } from './CollapsibleIndicator';
import { PrimitiveValue } from './PrimitiveValue';
import { useCollapsible } from '../hooks';
import {
  isCollapsible,
  getBrackets,
  getKeyClass,
  handleKeyDown,
} from '../utils';
import styles from '../styles.module.scss';
import type { JsonNodeProps, Primitive } from '../types';
import { CopyButton } from './CopyButton';

export const JsonNode = memo(
  ({
    name,
    keys = [],
    value,
    expandLevel = 0,
    onCopy,
  }: JsonNodeProps): ReactElement => {
    const initialCollapsed = expandLevel <= 0;
    const { collapsed, toggleCollapse } = useCollapsible(
      initialCollapsed,
      `jsonViewer-${name}`
    );
    const collapsible = isCollapsible(value);
    const [openingBracket, closingBracket] = getBrackets(value);
    const keyClass = getKeyClass(collapsible);

    const handleCopy = () => {
      const copyInfo = { keys: [...keys, name], value };
      onCopy?.(copyInfo);
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
              onKeyDown={(e: KeyboardEvent<HTMLDivElement>) =>
                handleKeyDown(e, toggleCollapse)
              }
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
            {onCopy && <CopyButton handleCopy={handleCopy} />}
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
                          keys={
                            keys.includes(name) ? [...keys] : [...keys, name]
                          }
                          onCopy={onCopy}
                        />
                      ))
                    : typeof value === 'object' && value !== null
                    ? Object.entries(value).map(([key, val]) => (
                        <JsonNode
                          key={key}
                          name={key}
                          value={val}
                          expandLevel={expandLevel - 1}
                          keys={
                            keys.includes(name) ? [...keys] : [...keys, name]
                          }
                          onCopy={onCopy}
                        />
                      ))
                    : null}
                </div>
                <span
                  tabIndex={0}
                  role='button'
                  aria-label={`Collapse ${name}`}
                  onClick={toggleCollapse}
                  onKeyDown={(e: KeyboardEvent<HTMLDivElement>) =>
                    handleKeyDown(e, toggleCollapse)
                  }
                  className={keyClass}
                >
                  {closingBracket}
                </span>
              </>
            )}
          </>
        ) : (
          <>
            <span className={keyClass}>"{name}":</span>
            <PrimitiveValue value={value as Primitive} />
            {onCopy && <CopyButton handleCopy={handleCopy} />}
          </>
        )}
      </div>
    );
  }
);
