import { MembershipProductProcessor } from "./membershipProductProcessor";

describe("MembershipProductProcessor", () => {
  let membershipProductProcessor: MembershipProductProcessor;

  beforeEach(() => {
    jest.clearAllMocks();
    membershipProductProcessor = new MembershipProductProcessor();
  });

  const consoleLogSpy = jest.spyOn(console, "log");

  describe("process()", () => {
    it("should call console.log with correct value", () => {
      membershipProductProcessor.process();
      expect(consoleLogSpy).toHaveBeenCalledWith("Activate the subscription");
      expect(consoleLogSpy).toHaveBeenCalledWith(
        "Notify the user via email about the subscription",
      );
    });
  });
});
