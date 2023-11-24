/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        // background: rgb(2,0,36);
        "auth-bg": "rgb(2,0,36)",
        "auth-gradient":
          "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(10,10,126,1) 35%, rgba(0,212,255,1) 100%)",
        "home-bg":"rgb(63,94,251)",
        "nav-bg":"rgb(2,9,43)"
        },
    },
  },
  plugins: [],
};
