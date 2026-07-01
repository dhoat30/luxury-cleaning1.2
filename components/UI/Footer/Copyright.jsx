import Typography from "@mui/material/Typography";
import React from "react";
import styles from "./Copyright.module.scss";

export default function Copyright() {
  return (
    <div className={`${styles.copyRight} row`}>
      <Typography variant="body2" component="p">
        <span> Luxury Housekeeping Limited © 2024. All right reserved | Built By </span>
        <a href="https://luxurycleaning.nz" target="_blank" rel="nofollow">
         web<strong>duel</strong>
        </a>
        
      </Typography>
    </div>
  );
}
