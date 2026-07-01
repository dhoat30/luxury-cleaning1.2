import { getAttributionForDataLayer } from "./marketingAttribution";

const normalizeValue = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

const normalizePhone = (value) => {
  const digits = String(value || "").replace(/\D/g, "");

  if (digits.startsWith("0")) {
    return `64${digits.slice(1)}`;
  }

  return digits;
};

const sha256 = async (value) => {
  if (!value || typeof window === "undefined" || !window.crypto?.subtle) {
    return "";
  }

  const encodedValue = new TextEncoder().encode(value);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", encodedValue);

  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

const getEnhancedConversionData = async (formData) => {
  const [email, phone, firstName, lastName, street] = await Promise.all([
    sha256(normalizeValue(formData.email)),
    sha256(normalizePhone(formData.phone)),
    sha256(normalizeValue(formData.first_name)),
    sha256(normalizeValue(formData.last_name)),
    sha256(normalizeValue(formData.street_address || formData.address_suburb)),
  ]);

  return {
    sha256_email_address: email,
    sha256_phone_number: phone,
    address: {
      sha256_first_name: firstName,
      sha256_last_name: lastName,
      sha256_street: street,
      // City, region, postal code and country are matched in plaintext by
      // Google Enhanced Conversions and must NOT be hashed.
      city: normalizeValue(formData.city),
      region: normalizeValue(formData.region),
      postal_code: normalizeValue(formData.postal_code),
      country: formData.country || "NZ",
    },
  };
};

export const pushQuoteSubmissionToGtm = async ({ formData, formName, formType }) => {
  if (typeof window === "undefined") return;

  const userData = await getEnhancedConversionData(formData);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "quote_form_submission",
    event_category: "form_submit",
    event_action: "quote_form_submission",
    event_label: formName,
    form_name: formName,
    form_type: formType,
    page_path: window.location.pathname,
    service_type: formData.service || "Spring Cleaning",
    service_frequency: formData.service_frequency || "Not selected",
    has_property_address: Boolean(formData.suburb?.trim()),
    has_message: Boolean(formData.message?.trim()),
    address_parts_captured: Boolean(
      formData.street_address || formData.address_suburb || formData.city
    ),
    user_data: userData,
    marketing: getAttributionForDataLayer(),
  });
};
