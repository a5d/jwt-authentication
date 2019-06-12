module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb", "prettier"],
  plugins: ["react", "jsx-a11y", "import"],
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-one-expression-per-line": [0],
    "no-console": 0,
    "no-alert": 0,
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["client", "node_modules", 'client/node_modules'],
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    },
  },
  "env": {
    "browser": true,
    "node": true
  }
};
