import React from 'react';
import styles from './Results.module.css';
import { ResultCards } from '../components/resultcards/resultCards';
import { ResultsMap } from '../components/resultcards/ResultsMap';

export const Results = () => {

  return (
    <div className={styles.result__page}>
      <ResultCards className={styles.cards} />
      <ResultsMap
        className={styles.resultcard__box}
      />
    </div>
  );
};
