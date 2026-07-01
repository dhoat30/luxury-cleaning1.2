"use client";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Script from "next/script";
import styles from "./BookConsultation.module.scss";

export default function BookConsultation({}) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Container maxWidth="xl" className={`${styles.container} row`}>
        <Box>
          <Typography variant="h2" component="h1">
            Book an Appointment
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            sx={{ marginTop: "16px" }}
            className={styles.description}
          >
            Ready to experience the luxury of a pristine, meticulously cleaned
            home? Booking an appointment with us is simple and hassle-free.
            Whether you need a one-time deep clean or regular maintenance, our
            team is here to provide the high-quality service you deserve.
          </Typography>
        </Box>
        <div className={styles.hubspotWrapper}>
          <div
            className="meetings-iframe-container"
            data-src="https://meetings.hubspot.com/hardeep-kaur-dhoat?embed=true"
          ></div>
        </div>
        <Script
          type="text/javascript"
          src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
        />
      </Container>
    </>
  );
}
