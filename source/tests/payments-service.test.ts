import * as payment from "../services/payments-service";

test("should be defined", () => {
    expect(payment.getPayment).toBeDefined();
});

test("should be defined", () => {
    expect(payment.getCutShortPayment).toBeDefined();
});

test("should get weekly amount", () => {
    const weeklyRent = 550;
    const frequency = "WEEKLY";

    expect(payment.getPayment(weeklyRent, frequency)).toBe(550);
});

test("should get fortnightly amount", () => {
    const weeklyRent = 550;
    const frequency = "FORTNIGHTLY";

    expect(payment.getPayment(weeklyRent, frequency)).toBe(1100);
});

test("should get monthly amount", () => {
    const weeklyRent = 550;
    const frequency = "MONTHLY";

    expect(payment.getPayment(weeklyRent, frequency)).toBe(2389.88);
});

test("should get cut short amount", () => {
    const weeklyRent = 550;
    const days = 5;

    expect(payment.getCutShortPayment(weeklyRent, days)).toBe(392.86);
});
