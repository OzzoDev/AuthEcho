module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      boxShadow: {
        "white-s": "0 0 5px rgba(255, 255, 255, 0.5)",
        "white-l": "0 0 20px rgba(255, 255, 255, 0.2)",
      },
    },
  },
  plugins: [],
};
