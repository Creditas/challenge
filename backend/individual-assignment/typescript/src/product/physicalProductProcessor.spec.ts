import { PhysicalProductProcessor } from "./physicalProductProcessor";

describe("PhysicalProductProcessor", () => {
  let physicalProductProcessor: PhysicalProductProcessor;

  beforeEach(() => {
    jest.clearAllMocks();
    physicalProductProcessor = new PhysicalProductProcessor();
  });

  const consoleLogSpy = jest.spyOn(console, "log");

  describe("process()", () => {
    it("should call console.log with correct value", () => {
      physicalProductProcessor.process();
      expect(consoleLogSpy).toHaveBeenCalledWith("Create shipping label");
    });
  });
});
