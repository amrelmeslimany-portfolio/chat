export const STATUS = {
  error: "error",
  success: "success",
  loading: "loading",
};

export const DATE_FORMAT = "dd/MM/yyyy";

export const IMG_HOSTING = "https://res.cloudinary.com";

export const API_SERVER =
  process.env.NODE_ENV === "production"
    ? "https://amr-chat.onrender.com"
    : "http://127.0.0.1:3005"; // In Production
