module.exports = {
  extends: [
    "plugin:vue/recommended"
  ],
  rules: {
    'vue/html-self-closing': ["error", {
      "html": {
        "void": "always",
        "normal": "never"
      }
    }]
  }
}
