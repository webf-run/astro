import styles from "./PackageCard.module.css"

export interface PackageCardProps {
  title: string;
  price: string;
  image: string;
}

export function PackageCard(props: PackageCardProps) {
  const { title, price, image } = props;

  return (

    <div className={styles.card}>
  <div className={styles.imageWrapper}>
    {
      image ? (
        <img src={image} alt={title} className={styles.cardCoverImage} />
      ) : (
        // <div style="width:90%; height:80%; background:#ccc; border-radius:8px;" />
        <div style={{
          width: "90%",
          height: "80%", 
          background: "#ccc",
          borderRadius: "8px"
        }} />
      )
    }
  </div>
  <div className={styles.description}>
    <div className={styles.title}>{title}</div>
    <div className={styles.price}>
      {price}
    </div>
  </div>
</div>
  )

}