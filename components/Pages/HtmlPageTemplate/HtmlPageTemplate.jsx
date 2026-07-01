"use client";
import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import styles from "./HtmlPageTemplate.module.scss";

export default function HtmlPageTemplate({ pageData }) {
  return (
    <Paper
      elevation={1}
      sx={{ background: "var(--light-surface-container-low)" }}
    >
      <Container maxWidth="xl" className={styles.container}>
        <Box className={styles.title}>
          <Typography variant="h2" component="h1">
            {pageData.title.rendered}
          </Typography>
        </Box>
        <Box className={styles.content}>
          <Typography
            variant="body1"
            component="div"
            dangerouslySetInnerHTML={{ __html: pageData.content.rendered }}
          ></Typography>
        </Box>
      </Container>
    </Paper>
  );
}
