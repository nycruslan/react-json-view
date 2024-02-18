import { memo } from 'react';

import type { PrimitiveValueProps } from '../types';

import styles from '../styles.module.scss';

export const PrimitiveValue: React.FC<PrimitiveValueProps> = memo(
  ({ data }) => {
    const valueType = data === null ? 'null' : typeof data;
    const className = `${styles.primitiveValue} ${styles[valueType] || ''}`;
    return <span className={className}>{JSON.stringify(data)}</span>;
  }
);
