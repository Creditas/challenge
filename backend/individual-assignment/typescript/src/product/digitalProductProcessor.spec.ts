import { Address } from "../address";
import { Customer } from "../customer";
import { EmailProviderService } from "../emailProviderService";
import { Order } from "../order";
import { DigitalProductProcessor } from "./digitalProductProcessor";

describe("DigitalProductProcessor", () => {
  let digitalProductProcessor: DigitalProductProcessor;
  const mockEmailSend = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    digitalProductProcessor = new DigitalProductProcessor({
      send: mockEmailSend,
    } as EmailProviderService);
  });

  const consoleLogSpy = jest.spyOn(console, "log");
  const order = new Order(
    new Customer("Customer Name", "customer@test.com"),
    new Address(),
  );

  describe("process()", () => {
    it("should call console.log with correct value", () => {
      digitalProductProcessor.process(order);
      expect(consoleLogSpy).toHaveBeenCalledWith(
        "Send the purchase description by email to the customer",
      );
      expect(consoleLogSpy).toHaveBeenCalledWith(
        "Grant a R$10 discount voucher to the customer Customer Name associated with the payment",
      );
      expect(mockEmailSend).toHaveBeenCalledWith(
        "customer@test.com",
        "Purchase Description",
        "Default Purchase Description",
      );
    });
  });
});
