import React from "react";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import EmailCircleIcon from "../Icons/EmailCircleIcon";
import PhoneCircleIcon from "../Icons/PhoneCircleIcon";
import LocationCircleIcon from "../Icons/LocationCircleIcon";
import styles from "./ContactInfo.module.scss";

export default function ContactInfo() {
  return (
    <div className={styles.container}>
      <div className={styles.infoWrapper}>
        <PhoneCircleIcon />
        <Link href="tel: 07 572 2255">
          <Typography variant="body1" component="span">
            07 572 2255
          </Typography>
        </Link>
      </div>
      <div className={styles.infoWrapper}>
        <EmailCircleIcon />
        <Link href="mailto: info@luxurycleaning.nz">
          <Typography variant="body1" component="span">
            info@luxurycleaning.nz
          </Typography>
        </Link>
      </div>
      <div className={styles.infoWrapper}>
        <LocationCircleIcon />
        <Link
          href="https://www.google.com/search?q=Luxury Cleaning&oq=Luxury Cleaning+&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIKCAEQABiABBiiBDIGCAIQRRg9MgYIAxBFGDwyBggEEEUYPDIGCAUQRRg8MgYIBhBFGD0yBggHEEUYQdIBCDEzNjNqMGo0qAIAsAIB&sourceid=chrome&ie=UTF-8"
          target="_blank"
        >
          <Typography variant="body1" component="span">
            <span>3 Parkside Mews</span> <br />
            <span>Papamoa, Tauranga 3118</span>
          </Typography>
        </Link>
      </div>
    </div>
  );
}
