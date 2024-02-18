import { useState } from 'react';
import styles from '../styles.module.scss';

export const CopyButton = ({ handleCopy }: { handleCopy: () => void }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleClick = () => {
    handleCopy();
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 1000); // Reset after 1s
  };

  return (
    <button
      onClick={handleClick}
      className={`${styles.copyButton} ${
        copySuccess ? styles.copySuccess : ''
      }`}
    >
      copy
    </button>
  );
};
