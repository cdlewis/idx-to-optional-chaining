const {defineTest} = require("jscodeshift/dist/testUtils");

for (let testCase of ["common-variations", "flow-annotation", "hanford-animate", "gnowth-entity"]) {
    defineTest(__dirname, "index", null, testCase);
}
