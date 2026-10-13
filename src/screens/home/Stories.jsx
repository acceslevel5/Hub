import styles from './Stories.module.css'
import { stories } from '../../data/home'
import Carousel from '../../components/Carousel'

export default function Stories() {
  return (
    <Carousel className={styles.stories}>
      {stories.map((s) => (
        <button key={s.id} type="button" className={`${styles.story} pressable`}>
          <div className={styles.thumb}>
            <img src={s.image} alt="" style={{ objectFit: s.fit || 'cover' }} />
          </div>
        </button>
      ))}
    </Carousel>
  )
}
