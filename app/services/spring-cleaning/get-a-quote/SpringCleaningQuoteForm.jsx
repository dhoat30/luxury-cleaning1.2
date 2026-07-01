"use client";

import { useMemo, useRef, useState } from "react";
import Alert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import { pushQuoteSubmissionToGtm } from "@/utlis/gtmQuoteTracking";
import { getAttributionSummary } from "@/utlis/marketingAttribution";
import { trackMetaLead } from "@/utlis/metaCapi";
import styles from "./SpringCleaningQuotePage.module.scss";

const hubspotFieldMap = {
  first_name: "firstname",
  last_name: "lastname",
  phone: "phone",
  email: "email",
  suburb: "suburb",
  service: "service",
  service_frequency: "service_frequency",
  property_type: "type_of_property",
  message: "message",
};

const initialValueForField = (field) => "";

let googlePlacesLoader;

const emptyAddressParts = {
  street_address: "",
  address_suburb: "",
  city: "",
  region: "",
  postal_code: "",
  country: "",
};

const getAddressComponent = (components, types, key = "long_name") =>
  components.find((component) =>
    types.some((type) => component.types.includes(type))
  )?.[key] || "";

const getAddressPartsFromPlace = (place) => {
  const components = place?.address_components || [];
  const streetNumber = getAddressComponent(components, ["street_number"]);
  const streetName = getAddressComponent(components, ["route"]);

  return {
    street_address: [streetNumber, streetName].filter(Boolean).join(" "),
    address_suburb: getAddressComponent(components, [
      "sublocality_level_1",
      "sublocality",
      "neighborhood",
    ]),
    city: getAddressComponent(components, [
      "locality",
      "postal_town",
      "administrative_area_level_2",
    ]),
    region: getAddressComponent(components, ["administrative_area_level_1"]),
    postal_code: getAddressComponent(components, ["postal_code"]),
    country: getAddressComponent(components, ["country"], "short_name"),
  };
};

const loadGooglePlaces = (apiKey) => {
  if (!apiKey || typeof window === "undefined") {
    return Promise.resolve(false);
  }

  if (window.google?.maps?.places) {
    return Promise.resolve(true);
  }

  if (googlePlacesLoader) {
    return googlePlacesLoader;
  }

  googlePlacesLoader = new Promise((resolve) => {
    const existingScript = document.querySelector(
      'script[data-google-places="true"]'
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true), {
        once: true,
      });
      existingScript.addEventListener("error", () => resolve(false), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      apiKey
    )}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.dataset.googlePlaces = "true";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });

  return googlePlacesLoader;
};

export default function SpringCleaningQuoteForm({
  title,
  subtitle,
  fields = [],
  submitLabel,
  finePrint,
  phoneDisplay,
  phoneHref,
  googleApiKey,
  formName = "Spring Cleaning Quote Form",
  formType = "spring_cleaning_quote",
  promiseText = "Fixed price · free home visit",
}) {
  const router = useRouter();
  const initialFormData = useMemo(
    () =>
      fields.reduce((values, field) => {
        values[field.name] = initialValueForField(field);
        return values;
      }, {}),
    [fields]
  );
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [addressPredictions, setAddressPredictions] = useState([]);
  const [addressStatus, setAddressStatus] = useState("idle");
  const addressLookupTimeout = useRef();
  const addressLookupId = useRef(0);
  const addressDetailsLookupId = useRef(0);

  const validateField = (field, rawValue) => {
    const value = rawValue?.trim() || "";

    if (field.required && !value) {
      return `${field.label} is required.`;
    }

    if (field.type === "email" && value && !/^\S+@\S+\.\S+$/.test(value)) {
      return "Please enter a valid email address.";
    }

    return "";
  };

  const isFieldVisible = (field, values = formData) => {
    if (!field.showWhen) return true;

    const currentValue = values[field.showWhen.field];
    if (Array.isArray(field.showWhen.equals)) {
      return field.showWhen.equals.includes(currentValue);
    }

    return currentValue === field.showWhen.equals;
  };

  const handleChange = (name, value) => {
    setFormData((current) => ({
      ...current,
      [name]: value,
      ...(name === "service" && value !== "Regular Cleaning"
        ? { service_frequency: "" }
        : {}),
    }));
    setErrors((current) => {
      if (!current[name]) return current;

      const field = fields.find((item) => item.name === name);
      if (!field) return current;

      return { ...current, [name]: validateField(field, value) };
    });

    if (name === "service" && value !== "Regular Cleaning") {
      setErrors((current) => ({ ...current, service_frequency: "" }));
    }

    if (name === "suburb" && value.trim().length < 3) {
      setAddressPredictions([]);
      setAddressStatus("idle");
    }
  };

  const handleBlur = (field) => {
    setErrors((current) => ({
      ...current,
      [field.name]: validateField(field, formData[field.name] || ""),
    }));
  };

  const lookupAddress = (value) => {
    const addressValue = value.trim();
    window.clearTimeout(addressLookupTimeout.current);

    if (!googleApiKey || !addressValue || addressValue.length < 3) {
      setAddressPredictions([]);
      setAddressStatus("idle");
      return;
    }

    const lookupId = addressLookupId.current + 1;
    addressLookupId.current = lookupId;

    addressLookupTimeout.current = window.setTimeout(() => {
      setAddressStatus("loading");

      loadGooglePlaces(googleApiKey).then((loaded) => {
        if (lookupId !== addressLookupId.current) return;

        if (!loaded || !window.google?.maps?.places?.AutocompleteService) {
          setAddressPredictions([]);
          setAddressStatus("idle");
          return;
        }

        const service = new window.google.maps.places.AutocompleteService();
        service.getPlacePredictions(
          {
            input: addressValue,
            componentRestrictions: { country: "nz" },
            types: ["address"],
          },
          (predictions, serviceStatus) => {
            if (lookupId !== addressLookupId.current) return;

            const placesStatus = window.google.maps.places.PlacesServiceStatus;
            if (serviceStatus === placesStatus.OK) {
              setAddressPredictions(
                (predictions || []).map((prediction) => ({
                  place_id: prediction.place_id,
                  description: prediction.description,
                }))
              );
            } else {
              setAddressPredictions([]);
            }

            setAddressStatus("idle");
          }
        );
      });
    }, 250);
  };

  const getPlaceDetails = async (placeId) => {
    const loaded = await loadGooglePlaces(googleApiKey);

    if (!loaded || !window.google?.maps?.places?.PlacesService) {
      return null;
    }

    return new Promise((resolve) => {
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );

      service.getDetails(
        {
          placeId,
          fields: ["address_components", "formatted_address"],
        },
        (place, serviceStatus) => {
          const placesStatus = window.google.maps.places.PlacesServiceStatus;

          if (serviceStatus !== placesStatus.OK || !place) {
            resolve(null);
            return;
          }

          resolve({
            formatted_address: place.formatted_address || "",
            ...getAddressPartsFromPlace(place),
          });
        }
      );
    });
  };

  const handleAddressSelection = (name, value) => {
    const fullAddress =
      typeof value === "string" ? value : value?.description || "";

    handleChange(name, fullAddress);
    setAddressPredictions([]);

    if (!value?.place_id) {
      setFormData((current) => ({ ...current, ...emptyAddressParts }));
      return;
    }

    const detailsLookupId = addressDetailsLookupId.current + 1;
    addressDetailsLookupId.current = detailsLookupId;

    getPlaceDetails(value.place_id).then((addressParts) => {
      if (!addressParts || detailsLookupId !== addressDetailsLookupId.current) {
        return;
      }

      setFormData((current) => ({
        ...current,
        [name]: addressParts.formatted_address || fullAddress,
        ...emptyAddressParts,
        ...addressParts,
      }));
    });
  };

  const validate = () => {
    const nextErrors = {};

    fields.forEach((field) => {
      if (!isFieldVisible(field)) return;

      const error = validateField(field, formData[field.name] || "");
      if (error) {
        nextErrors[field.name] = error;
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus("loading");

    const visibleFields = fields.filter((field) => isFieldVisible(field));

    const addressMessage = [
      ["Street address", formData.street_address],
      ["Suburb", formData.address_suburb],
      ["City", formData.city],
      ["Region", formData.region],
      ["Postcode", formData.postal_code],
      ["Country", formData.country],
    ]
      .filter(([, value]) => value)
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n");

    const message = [
      visibleFields
      .map((field) => `${field.label}: ${formData[field.name] || "Not provided"}`)
        .join("\n"),
      addressMessage,
      getAttributionSummary(),
    ]
      .filter(Boolean)
      .join("\n");

    const hubspotFormObject = visibleFields
      .filter((field) => hubspotFieldMap[field.name])
      .map((field) => ({
        name: hubspotFieldMap[field.name],
        value: formData[field.name] || "",
      }));

    const payload = {
      email: formData.email || "mail@luxurycleaning.nz",
      formName,
      message,
      portalID: "47120588",
      hubspotFormID: "53928c0c-9a8f-4b57-8b19-91f0ecffd8ae",
      hubspotFormObject,
    };

    try {
      const [hubspotResponse, mailResponse] = await Promise.all([
        fetch("/api/submit-hubspot-form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
        fetch("/api/sendmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
      ]);

      if (!hubspotResponse.ok || !mailResponse.ok) {
        throw new Error("Quote form submission failed.");
      }

      await pushQuoteSubmissionToGtm({ formData, formName, formType });
      await trackMetaLead({ formData, eventName: "Lead" });
      setStatus("success");
      router.push("/form/thank-you");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className={styles.quoteForm} onSubmit={submitHandler} noValidate>
      <div className={styles.formHeader}>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>

      {promiseText && <div className={styles.formPromise}>{promiseText}</div>}

      <div className={styles.fields}>
        {fields.map((field) => {
          if (!isFieldVisible(field)) return null;

          const fieldId = `quote-${field.name}`;
          const isTextarea = field.type === "textarea";
          const isSelect = field.type === "select";
          const isAddressField = field.name === "suburb";
          const isFullWidthField = [
            "email",
            "phone",
            "suburb",
            "service",
            "service_frequency",
            "property_type",
            "message",
          ].includes(field.name);
          const helperText = errors[field.name] || "";

          return (
            <div
              className={`${styles.field} ${
                isFullWidthField || isAddressField || isTextarea
                  ? styles.fullField
                  : ""
              }`}
              key={field.name}
            >
              {isAddressField ? (
                <Autocomplete
                  freeSolo
                  filterOptions={(options) => options}
                  getOptionLabel={(option) =>
                    typeof option === "string" ? option : option.description
                  }
                  inputValue={formData[field.name] || ""}
                  loading={addressStatus === "loading"}
                  options={addressPredictions}
                  renderOption={(props, option) => {
                    const { key, ...optionProps } = props;

                    return (
                      <li key={key} {...optionProps}>
                        {option.description}
                      </li>
                    );
                  }}
                  onChange={(_, value) => {
                    handleAddressSelection(field.name, value);
                  }}
                  onInputChange={(_, value, reason) => {
                    if (reason === "input" || reason === "clear") {
                      handleChange(field.name, value);
                      lookupAddress(value);
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id={fieldId}
                      label={field.label}
                      required={field.required}
                      error={Boolean(errors[field.name])}
                      helperText={helperText}
                      onBlur={() => handleBlur(field)}
                      fullWidth
                    />
                  )}
                />
              ) : isSelect ? (
                <TextField
                  id={fieldId}
                  label={field.label}
                  select
                  SelectProps={{ native: true }}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={formData[field.name] || ""}
                  onChange={(event) =>
                    handleChange(field.name, event.target.value)
                  }
                  required={field.required}
                  error={Boolean(errors[field.name])}
                  helperText={helperText}
                  onBlur={() => handleBlur(field)}
                >
                  <option value="">{field.placeholder || "Select..."}</option>
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </TextField>
              ) : isTextarea ? (
                <TextField
                  id={fieldId}
                  label={field.label}
                  fullWidth
                  multiline
                  value={formData[field.name] || ""}
                  onChange={(event) =>
                    handleChange(field.name, event.target.value)
                  }
                  required={field.required}
                  rows={4}
                  error={Boolean(errors[field.name])}
                  helperText={helperText}
                  onBlur={() => handleBlur(field)}
                />
              ) : (
                <TextField
                  id={fieldId}
                  label={field.label}
                  type={field.type}
                  fullWidth
                  value={formData[field.name] || ""}
                  onChange={(event) =>
                    handleChange(field.name, event.target.value)
                  }
                  required={field.required}
                  error={Boolean(errors[field.name])}
                  helperText={helperText}
                  onBlur={() => handleBlur(field)}
                  autoComplete={
                    field.name === "first_name"
                      ? "given-name"
                      : field.name === "last_name"
                        ? "family-name"
                      : field.name === "phone"
                        ? "tel"
                        : field.name === "email"
                          ? "email"
                          : "off"
                  }
                />
              )}
            </div>
          );
        })}
      </div>

      <Button
        className={styles.submitButton}
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        disabled={status === "loading"}
      >
        {status === "loading" && <CircularProgress size={18} />}
        {submitLabel}
      </Button>

      {phoneDisplay && phoneHref && (
        <div className={styles.formPhone}>
          <span aria-hidden="true">☎</span>
          <span>Prefer to talk?</span>
          <a href={phoneHref}>{phoneDisplay}</a>
        </div>
      )}

      {finePrint && <p className={styles.finePrint}>{finePrint}</p>}
      {status === "error" && (
        <Alert severity="error">
          Something went wrong. Please try again or call 07 572 2255.
        </Alert>
      )}
    </form>
  );
}
