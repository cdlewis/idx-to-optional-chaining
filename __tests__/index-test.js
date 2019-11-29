jest.autoMockOff();
const defineTest = require("jscodeshift/dist/testUtils").defineTest;
defineTest(__dirname, "index", null, "common-variations");
defineTest(__dirname, "index", null, "flow-annotation");
