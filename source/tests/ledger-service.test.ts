import ledgerService from "../services/ledger-service";

test("should be defined", () => {
    expect(ledgerService.getLedgerForLease).toBeDefined();
});

test("should get weekly lease", () => {
    const startDate = "2020-11-02T00:00:00.000Z";
    const endDate = "2020-11-18T00:00:00.000Z";
    const frequency = "WEEKLY";
    const weeklyRent = 550;
    const timezone = "Asia/Colombo";

    const ledger = [
        {
            startDate: "2020-11-02T00:00:00.000Z",
            endDate: "2020-11-08T00:00:00.000Z",
            amount: 550
        },
        {
            startDate: "2020-11-09T00:00:00.000Z",
            endDate: "2020-11-15T00:00:00.000Z",
            amount: 550
        },
        {
            startDate: "2020-11-16T00:00:00.000Z",
            endDate: "2020-11-18T00:00:00.000Z",
            amount: 235.71
        }
    ];

    expect(ledgerService.getLedgerForLease(startDate, endDate, frequency, weeklyRent, timezone)).toStrictEqual(ledger);
});

test("should get fortnightly lease", () => {
    const startDate = "2020-03-28T00:00:00.000Z";
    const endDate = "2020-05-27T00:00:00.000Z";
    const frequency = "FORTNIGHTLY";
    const weeklyRent = 550;
    const timezone = "Asia/Colombo";

    const ledger = [
        {
            startDate: "2020-03-28T00:00:00.000Z",
            endDate: "2020-04-10T00:00:00.000Z",
            amount: 1100
        },
        {
            startDate: "2020-04-11T00:00:00.000Z",
            endDate: "2020-04-24T00:00:00.000Z",
            amount: 1100
        },
        {
            startDate: "2020-04-25T00:00:00.000Z",
            endDate: "2020-05-08T00:00:00.000Z",
            amount: 1100
        },
        {
            startDate: "2020-05-09T00:00:00.000Z",
            endDate: "2020-05-22T00:00:00.000Z",
            amount: 1100
        },
        {
            startDate: "2020-05-23T00:00:00.000Z",
            endDate: "2020-05-27T00:00:00.000Z",
            amount: 392.86
        }
    ];

    expect(ledgerService.getLedgerForLease(startDate, endDate, frequency, weeklyRent, timezone)).toStrictEqual(ledger);
});

test("should get monthly lease", () => {
    const startDate = "2020-01-07T00:00:00.000Z";
    const endDate = "2020-05-08T00:00:00.000Z";
    const frequency = "MONTHLY";
    const weeklyRent = 550;
    const timezone = "Asia/Colombo";

    const ledger = [
        {
            startDate: "2020-01-07T00:00:00.000Z",
            endDate: "2020-02-07T00:00:00.000Z",
            amount: 2389.88
        },
        {
            startDate: "2020-02-07T00:00:00.000Z",
            endDate: "2020-03-07T00:00:00.000Z",
            amount: 2389.88
        },
        {
            startDate: "2020-03-07T00:00:00.000Z",
            endDate: "2020-04-07T00:00:00.000Z",
            amount: 2389.88
        },
        {
            startDate: "2020-04-07T00:00:00.000Z",
            endDate: "2020-05-07T00:00:00.000Z",
            amount: 2389.88
        },
        {
            startDate: "2020-05-08T00:00:00.000Z",
            endDate: "2020-05-08T00:00:00.000Z",
            amount: 78.57
        }
    ];

    expect(ledgerService.getLedgerForLease(startDate, endDate, frequency, weeklyRent, timezone)).toStrictEqual(ledger);
});
