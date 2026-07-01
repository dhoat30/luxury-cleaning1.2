import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";
import Chip from "@mui/material/Chip";
import dynamic from "next/dynamic";
import styles from "./Input.module.scss";
// Dynamically import Slider with SSR disabled
const Select = dynamic(() => import("@mui/material/Select"), {
  ssr: false,
});
const TextField = dynamic(() => import("@mui/material/TextField"), {
  ssr: false,
});

// styling for select
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Input({
  label,
  type,
  value,
  onChange,
  onBlur,
  required,
  autoComplete,
  errorMessage,
  isInvalid,
  options,
  multipleValue,
  lightTheme,
  min,
  max,
  note,
  ...props
}) {
  if (type === "radio") {
    return (
      <FormControl
        className={styles.formControl}
        error={required ? isInvalid : null}
        variant="standard"
        sx={{ marginTop: "16px" }}
        fullWidth
      >
        <FormLabel className="radio-label">
          <Typography variant="h6" component="div">
            {label}
          </Typography>
        </FormLabel>
        <RadioGroup
          aria-labelledby="error-radios"
          name="quiz"
          color={lightTheme ? "primary" : "secondary"}
          value={value}
          onChange={onChange}
          sx={{ marginTop: "8px" }}
        >
          {options.map((option, index) => (
            <FormControlLabel
              color="white"
              sx={{ color: "rgba(255, 255, 255, 0.7)" }}
              key={index}
              value={option.value}
              control={<Radio color={lightTheme ? "primary" : "secondary"} />}
              label={option.label}
            />
          ))}
        </RadioGroup>
        <FormHelperText error={isInvalid}>
          {isInvalid && errorMessage}
        </FormHelperText>
      </FormControl>
    );
  } else if (type === "select") {
    return (
      <FormControl
        className={styles.formControl}
        error={required ? isInvalid : null}
        sx={{ marginTop: "16px " }}
        color="secondary"
        fullWidth={true}
      >
        <InputLabel id="multiple-checkbox-label" sx={{ width: "100%" }}>
          {label}
        </InputLabel>
        <Select
          sx={{ width: "100%" }}
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          multiple={multipleValue}
          value={value}
          onChange={onChange}
          input={<OutlinedInput label={label} />}
          renderValue={
            multipleValue
              ? (selected) => selected.join(", ")
              : (selected) => selected.toString()
          }
          MenuProps={MenuProps}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              <Checkbox
                checked={value.indexOf(option.value) > -1}
                color={lightTheme ? "primary" : "secondary"}
              />
              <ListItemText
                primary={option.label}
                color={lightTheme ? "primary" : "secondary"}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  } else if (type == "checkbox") {
    return (
      <FormControl
        className={styles.formControl}
        error={required ? isInvalid : null}
        variant="standard"
        sx={{ marginTop: "16px " }}
      >
        <FormLabel className="radio-label">
          <Typography variant="h6" component="div">
            {label}
          </Typography>
        </FormLabel>

        <FormGroup
          aria-labelledby="checkbox"
          name="checkbox group"
          color={lightTheme ? "primary" : "secondary"}
          value={value}
          onChange={onChange}
          sx={{ marginTop: "8px" }}
        >
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option.value}
              control={
                <Checkbox
                  checked={value.indexOf(option.value) > -1}
                  name={option.label}
                  color={lightTheme ? "primary" : "secondary"}
                />
              }
              label={option.label}
            />
          ))}
        </FormGroup>

        <FormHelperText error={isInvalid}>
          {isInvalid && errorMessage}
        </FormHelperText>
      </FormControl>
    );
  } else if (type === "slider") {
    return (
      <div className={styles.sliderContainer}>
        <FormLabel className="radio-label">
          <Typography variant="h6" component="div">
            {label}
          </Typography>
        </FormLabel>
        <div className={styles.sliderWrapper}>
          <Slider
            aria-label="Default"
            valueLabelDisplay="auto"
            value={value}
            onChange={onChange}
            min={min}
            max={max}
          />
          <TextField
            className={styles.textField}
            value={value ? value : min}
            size="small"
            onChange={onChange}
            color={lightTheme ? "primary" : "secondary"}
            inputProps={{
              step: 1,
              min: min,
              max: max,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
        </div>
        {note && <FormHelperText>{note}</FormHelperText>}

        <FormHelperText error={isInvalid}>
          {isInvalid && errorMessage}
        </FormHelperText>
      </div>
    );
  } else if (type === "chip") {
    const handleChipClick = (optionValue) => {
      let currentValues = Array.isArray(value) ? [...value] : [];
      if (currentValues.includes(optionValue)) {
        currentValues = currentValues.filter((item) => item !== optionValue); // Remove if already present
      } else {
        currentValues.push(optionValue); // Add if not present
      }
      onChange(currentValues); // Pass back the updated array to the parent component
    };

    return (
      <FormControl
        className={styles.formControl}
        error={required ? isInvalid : null}
        style={{ marginTop: "16px" }}
      >
        <Typography variant="h5" component="div">
          {label}
        </Typography>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            marginTop: "16px",
          }}
        >
          {options.map((option, index) => (
            <Chip
              key={index}
              label={option.label}
              onClick={() => handleChipClick(option.value)}
              variant={value.includes(option.value) ? "filled" : "outlined"}
              color={"primary"}
            />
          ))}
        </div>
        <FormHelperText error={isInvalid}>
          {isInvalid && errorMessage}
        </FormHelperText>
      </FormControl>
    );
  } else {
    return (
      <TextField
        className={styles.textField}
        sx={{
          marginTop: "24px",
        }}
        label={label}
        type={type}
        value={value}
        color={lightTheme ? "primary" : "secondary"}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        variant="outlined"
        fullWidth
        autoComplete={autoComplete}
        helperText={isInvalid && errorMessage}
        error={required ? isInvalid : null}
        multiline={type === "textarea" ? true : false}
        minRows={type === "textarea" ? 3 : null}
      />
    );
  }
}
