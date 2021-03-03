global.td = require("testdouble");
global.expect = require("expect");

require("testdouble-jest")(td, jest);
require("jest-localstorage-mock");

afterEach(() => {
    td.reset();

    localStorage.clear();
})