/** Styling imports */
import styles from './Example.module.css'

const Example = () => {
  return (
    <div className={styles['example']}>
      This is an example of module-based styling
    </div>
  )
}

export default Example