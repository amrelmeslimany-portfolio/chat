const maxAge = 60 * 60 * 24 * 10;

module.exports = {
  tokenName: "token",
  cookieOptions: {
    // FIXME
    httpOnly: true,
    maxAge: 1000 * maxAge,
    sameSite: "none",
    secure: true,
  },
  genderImages: {
    male: "https://res.cloudinary.com/dgdra1dym/image/upload/v1691330313/ezgif.com-crop_1_zmltnc.gif",
    female:
      "https://res.cloudinary.com/dgdra1dym/image/upload/v1691330326/ezgif.com-optimize_1_kkefd1.gif",
  },
  serverMessage: "There is a problem (Network or Server), try again",
  CLIENT_URL:
    process.env.NODE_ENV === "production"
      ? "https://amr-chat.netlify.app"
      : "http://127.0.0.1:5173",
};
