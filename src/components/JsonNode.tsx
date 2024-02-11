import { memo, ReactElement } from 'react';
import { CollapsibleIndicator } from './CollapsibleIndicator';
import { PrimitiveValue } from './PrimitiveValue';
import { useCollapsible } from '../hooks';
import { isCollapsible, getBrackets, getKeyClass } from '../utils';
import styles from '../styles.module.scss';
import type { JsonNodeProps, Primitive } from '../types';

export const JsonNode = memo(({ name, value }: JsonNodeProps): ReactElement => {
  const { collapsed, toggleCollapse } = useCollapsible();
  const collapsible = isCollapsible(value);
  const [openingBracket, closingBracket] = getBrackets(value);
  const keyClass = getKeyClass(collapsible);

  return (
    <div className={styles.node}>
      {collapsible ? (
        <>
          <span onClick={toggleCollapse} className={keyClass}>
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
            </>
          )}
        </>
      ) : (
        <>
          <span className={keyClass}>"{name}": </span>{' '}
          <PrimitiveValue value={value as Primitive} />
        </>
      )}
    </div>
  );
});
