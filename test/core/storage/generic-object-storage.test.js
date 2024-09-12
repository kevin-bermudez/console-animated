const { saveObject } = require("../../../core/storage/generic-object-storage");

describe("Validator", () => {
  const validator = new Validator();

  test("defines setRule()", () => {
    expect(typeof validator.setRule).toBe("function");
  });
});