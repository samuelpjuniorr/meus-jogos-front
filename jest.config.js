module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  moduleDirectories: ['node_modules'],
  transform: {
    //"^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|png|gif|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    //"^.+\\.jsx?$": "babel-jest"
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest",
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    //'^@/(.*)$': '<rootDir>/$1'
    "^pdfmakeSp$": "<rootDir>/node_modules/pdfmake",
    "^vfsfontsSp$": "<rootDir>/node_modules/pdfmake",
  },
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: [
    "**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
  ],
  collectCoverage: true,
};
