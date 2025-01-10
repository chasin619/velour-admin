import * as Yup from "yup";

export const ClientSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full Name is required")
    .min(3, "Full Name must be at least 3 characters long"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  portalName: Yup.string()
    .required("Portal Name is required")
    .min(3, "Portal Name must be at least 3 characters long"),
});