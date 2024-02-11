import { memo } from 'react';

import type { PrimitiveValueProps } from '../types';

import styles from '../styles.module.scss';

export const PrimitiveValue: React.FC<PrimitiveValueProps> = memo(
  ({ value }) => {
    const valueType = value === null ? 'null' : typeof value;
    const className = `${styles.primitiveValue} ${styles[valueType] || ''}`;
    return <span className={className}>{JSON.stringify(value)}</span>;
  }
);
