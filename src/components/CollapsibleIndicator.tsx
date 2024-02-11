import { memo } from 'react';

import type { CollapsibleIndicatorProps } from '../types';

import styles from '../styles.module.scss';

export const CollapsibleIndicator: React.FC<CollapsibleIndicatorProps> = memo(
  ({ collapsed }) => (
    <span
      className={collapsed ? styles.arrowCollapsed : styles.arrowExpanded}
    />
  )
);
