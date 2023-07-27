import React from "react";
import styles from "./ContentLoader.module.scss";
import Spin from "sspin";

export default function ContentLoader() {
  return (
    <div className={styles.provider}>
      <Spin />
    </div>
  );
}
