import styles from '../../pages/Results.module.css';
import { useSelector } from 'react-redux'
import ResultSingleCard from './ResultSingleCard'

export const ResultCards = () => {
  const card = useSelector((store) => store.toolkit.points)

  return (
    <div className={styles.wrapper_results}>
      {card.map((el) => (
        <ResultSingleCard
          key={el.id}
          el={el}
        />
      ))}
    </div>
  )
}
