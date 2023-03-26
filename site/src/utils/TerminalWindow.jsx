// TerminalWindow.js
import React from 'react';
import TerminalCode from './TerminalCode';
import styles from '../css/TerminalWindow.module.css';

const TerminalWindow = ({ language, codeString }) => {
  return (
    <div className={styles['terminal-window']}>
      <div className={styles.header}>
        <div className={`${styles['red-circle']} ${styles.circle}`} />
        <div className={`${styles['yellow-circle']} ${styles.circle}`} />
        <div className={`${styles['green-circle']} ${styles.circle}`} />
      </div>
      <TerminalCode language={language} codeString={codeString} />
    </div>
  );
};

export default TerminalWindow;
