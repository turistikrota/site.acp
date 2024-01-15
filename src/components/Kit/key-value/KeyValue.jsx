import styles from "./KeyValue.module.scss"

const KeyValue = ({label, value, color}) => {
 return <div className={`${styles.keyValue}`}>
    <span className={styles.keyValue_key}>{label}</span>
    <span className={`${styles.keyValue_value} ${color ? `text-${color}`: ''}`}>{value}</span>
 </div>   
}

export default KeyValue