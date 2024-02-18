import React, { memo } from 'react';

import styles from '../styles.module.scss';

export const CollapsibleIndicator: React.FC<{ collapsed: boolean }> = memo(
  ({ collapsed }) => {
    const arrowClassName = `${styles.arrow} ${
      collapsed ? styles.collapsed : styles.expanded
    }`;

    return <span className={arrowClassName} />;
  }
);
