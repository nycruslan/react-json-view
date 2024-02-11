import styles from '../styles.module.scss';
import type { JsonValue } from '../types';

export const isCollapsible = (value: JsonValue): boolean =>
  typeof value === 'object' && value !== null;

export const getBrackets = (value: JsonValue): [string, string] =>
  Array.isArray(value) ? ['[', ']'] : ['{', '}'];

export const getKeyClass = (collapsible: boolean) =>
  collapsible
    ? `${styles.key} ${styles.collapsible}`
    : `${styles.key} ${styles.primitive}`;

export const handleKeyDown = (
  event: React.KeyboardEvent<HTMLDivElement>,
  toggleCollapse: () => void
) => {
  if (event.key === 'Enter' || event.key === ' ') {
    toggleCollapse();
    event.preventDefault();
  }
};

export const handleCopy = ({
  name,
  value,
}: {
  name: string;
  value: JsonValue;
}) => navigator.clipboard.writeText(JSON.stringify({ [name]: value }));
