import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import DoneIcon from "@mui/icons-material/Done";
import styles from "./LoadingBtn.module.scss";

function LoadingBtn({
  align,
  isLoading,
  onClick,
  isSuccess,
  className,
  label,
  children,
  newSubmission,
  id,
}) {
  let labelText = children ? children : "Submit";
  const alignmentClass = align === "right" ? styles.alignRight : styles.alignDefault;
  return (
    <LoadingButton
      className={`${styles.loadingButton} ${alignmentClass} ${className || ""}`}
      id={id}
      onClick={onClick}
      align={align}
      size="large"
      variant="contained"
      disableElevation
      disabled={isSuccess}
      loading={isLoading}
    >
      {isSuccess && !newSubmission ? (
        <DoneIcon sx={{ color: "var(--dark-on-surface) !important" }} />
      ) : (
        labelText
      )}
    </LoadingButton>
  );
}

export default LoadingBtn;
