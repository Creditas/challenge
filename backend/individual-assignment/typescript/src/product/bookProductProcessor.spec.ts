import { BookProductProcessor } from "./bookProductProcessor";

describe("BookProductProcessor", () => {
  let bookProductProcessor: BookProductProcessor;

  beforeEach(() => {
    jest.clearAllMocks();
    bookProductProcessor = new BookProductProcessor({});
  });
  const consoleLogSpy = jest.spyOn(console, "log");

  describe("process()", () => {
    it("should call console.log with correct value", () => {
      bookProductProcessor.process();
      expect(consoleLogSpy).toHaveBeenCalledWith(
        "Create shipping label with notification that it is a tax-exempt item as provided in the Constitution Art. 150, VI, d.",
      );
    });
  });
});
