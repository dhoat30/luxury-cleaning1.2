"use client";
import Container from "@mui/material/Container";
import { lightTheme } from "@/utlis/themeSettings";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import styles from "./GetQuotePage.module.scss";
const WebsiteInquiryLongForm = dynamic(() =>
  import("@/components/UI/Forms/WebsiteInquiryLongForm")
);

export default function GetQuotePage2({ title, description }) {
  return (
    <>
      <section className={styles.section}>
        <Container maxWidth="xl" className={`${styles.container} row`}>
          <div className={styles.contentWrapper}>
            <Typography variant="h3" component="h1">
              {title}
            </Typography>
            <Typography
              variant="body1"
              component="div"
              sx={{ marginTop: "16px" }}
            >
              {description}
            </Typography>
            <Link href="/money-back-guarantee" className="image-wrapper">
              <Image
                className={styles.image}
                src="/money-back.png"
                alt="Get a Quote"
                width="256"
                height="246"
                quality={100}
              />
            </Link>
          </div>
          <Paper className={styles.formWrapper} variant="outlined">
            <WebsiteInquiryLongForm />
          </Paper>
        </Container>
      </section>
    </>
  );
}
