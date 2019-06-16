module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb", "prettier"],
  plugins: ["react", "jsx-a11y", "import"],
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-one-expression-per-line": [0],
    "no-console": 0,
    "no-alert": 0,
    "import/no-unresolved": [0],
    "no-shadow": "off",
  },
  "env": {
    "browser": true,
    "node": true
  }
};
