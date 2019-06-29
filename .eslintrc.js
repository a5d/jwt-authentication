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
    "no-useless-escape": [0],
    "no-shadow": "off",
    "import/no-extraneous-dependencies": [0],
    "object-curly-spacing": ["error", "never"]
  },
  "env": {
    "browser": true,
    "node": true,
    "jest": true
  },
};
