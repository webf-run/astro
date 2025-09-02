import { useState } from "react";
import { PackageCard } from "./PackageCard";

import styles from "./PackageCarousel.module.css"

export interface PackageCarouselProps {
  packageCarouselTitle: string;
  packageList: Array<{
    title: string;
    price: string;
    coverImage: string;
  }>;
}



export function PackageCarousel(props: PackageCarouselProps) {
  const { packageCarouselTitle, packageList } = props;

  const [current, setCurrent] = useState(0);
  const maxVisible = 4;

  function getVisibleItems() {
    return packageList.slice(current, current + maxVisible);
  }

  function canGoPrev() {
    if (current > 0)
      return setCurrent(current-1);
  }

  function canGoNext() {
    if (packageList.length - current > 4)
      setCurrent(current+1);
  }

  return (
    <section className={styles.carousel}>
      <div className={"container"}>
        {/* Header row */}
        <div style={{
          display: "flex", flexDirection: "column", gap: "5px"
        }}>
          <div className={styles.headerRow}>
            <div className={styles.title}>{packageCarouselTitle}</div>

            <div className={styles.arrowGroup}>
              <button onClick={canGoPrev} disabled={current === 0} className={styles.arrowBtn} aria-label="Previous"> &#8592; </button>
              <button onClick={canGoNext} disabled={packageList.length - current <= 4} className={styles.arrowBtn} aria-label="Next"> &#8594; </button>
            </div>
          </div>
          {/* Cards row */}
          <div className={styles.cardRow}>
            {
              getVisibleItems()
                .map((dest: any, index) => (
                  <PackageCard
                    key={index}
                    title={dest.title}
                    price={dest.priceFrom}
                    image={dest.coverImage}
                  />
                ))
            }
          </div>
        </div>
      </div>
    </section>
  )

}