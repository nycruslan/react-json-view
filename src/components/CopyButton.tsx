import styles from '../styles.module.scss';

export const CopyButton = ({ handleCopy }: { handleCopy: () => void }) => {
  return (
    <button onClick={handleCopy} className={styles.copyButton}>
      Copy
    </button>
  );
};
