jest.autoMockOff();
const defineTest = require("jscodeshift/dist/testUtils").defineTest;
defineTest(__dirname, "index", null, "common-variations");
defineTest(__dirname, "index", null, "flow-annotation");
defineTest(__dirname, "index", null, "hanford-animate");

// Disable until https://github.com/cdlewis/idx-to-optional-chaining/issues/7 is resolved
// defineTest(__dirname, "index", null, "gnowth-entity");