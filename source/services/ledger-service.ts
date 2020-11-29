import logging from "../utils/logging";
import { Frequency } from "../models/payment-frequency";
import * as payment from "./payments-service";
var moment = require("moment-timezone");

const NAMESPACE = "Ledger Service";

const getLedgerForLease = (startDate, endDate, frequency, weeklyRent, timezone) => {
    const sdate = moment.tz(startDate, timezone);
    const edate = moment.tz(endDate, timezone);
    let ledger = [];

    const totalDays = edate.diff(sdate, "days") + 1;
    const totalMonths = edate.diff(sdate, "months");

    if (frequency == Frequency.WEEKLY) {
        const periods = Math.floor(totalDays / 7);

        for (let i = 0; i < periods; i++) {
            const leaseStartDate = sdate.toISOString();
            const leaseEndDate = sdate.add(6, "days").toISOString();

            const amount = payment.getPayment(weeklyRent, frequency);

            ledger.push({ startDate: leaseStartDate, endDate: leaseEndDate, amount });

            sdate.add(1, "days");
        }

        const cutShortDays = edate.diff(sdate.add(-1, "days"), "days");
        const cutShortPeriod = getCutShortPeriod(sdate, edate, cutShortDays, weeklyRent);

        if (cutShortPeriod) {
            ledger.push(cutShortPeriod);
        }
    } else if (frequency == Frequency.FORTNIGHTLY) {
        const periods = Math.floor(totalDays / 14);

        for (let i = 0; i < periods; i++) {
            const leaseStartDate = sdate.toISOString();
            const leaseEndDate = sdate.add(13, "days").toISOString();

            const amount = payment.getPayment(weeklyRent, frequency);

            ledger.push({ startDate: leaseStartDate, endDate: leaseEndDate, amount });

            sdate.add(1, "days");
        }

        const cutShortDays = edate.diff(sdate.add(-1, "days"), "days");
        const cutShortPeriod = getCutShortPeriod(sdate, edate, cutShortDays, weeklyRent);

        if (cutShortPeriod) {
            ledger.push(cutShortPeriod);
        }
    } else if (frequency == Frequency.MONTHLY) {
        if (sdate.date() == 31) {
            for (let i = 0; i < totalMonths; i++) {
                const startingMonth = sdate.toISOString();
                const endingMonth = sdate.add(1, "M").endOf("month").toISOString();

                const amount = payment.getPayment(weeklyRent, frequency);

                ledger.push({ startDate: startingMonth, endDate: endingMonth, amount });
            }

            const cutShortDays = edate.diff(sdate, "days") + 1;
            const cutShortPeriod = getCutShortPeriod(sdate, edate, cutShortDays, weeklyRent);

            if (cutShortPeriod) {
                ledger.push(cutShortPeriod);
            }
        } else if (sdate.date() == 30) {
            for (let i = 0; i < totalMonths; i++) {
                const startingMonth = sdate.toISOString();
                let endingMonth = sdate.add(1, "M").toISOString();
                if (sdate.month() == 2) {
                    endingMonth = sdate.set("date", 30).toISOString();
                }

                const amount = payment.getPayment(weeklyRent, frequency);

                ledger.push({ startDate: startingMonth, endDate: endingMonth, amount });
            }

            const cutShortDays = edate.diff(sdate, "days");
            const cutShortPeriod = getCutShortPeriod(sdate, edate, cutShortDays, weeklyRent);

            if (cutShortPeriod) {
                ledger.push(cutShortPeriod);
            }
        } else if (sdate.date() == 29) {
            for (let i = 0; i < totalMonths; i++) {
                const startingMonth = sdate.toISOString();
                let endingMonth = sdate.add(1, "M").toISOString();
                if (!sdate.isLeapYear() && sdate.month() == 2) {
                    endingMonth = sdate.set("date", 29).toISOString();
                }

                const amount = payment.getPayment(weeklyRent, frequency);

                ledger.push({ startDate: startingMonth, endDate: endingMonth, amount });
            }

            const cutShortDays = edate.diff(sdate, "days");
            const cutShortPeriod = getCutShortPeriod(sdate, edate, cutShortDays, weeklyRent);

            if (cutShortPeriod) {
                ledger.push(cutShortPeriod);
            }
        } else {
            for (let i = 0; i < totalMonths; i++) {
                const startingMonth = sdate.toISOString();
                const endingMonth = sdate.add(1, "M").toISOString();

                const amount = payment.getPayment(weeklyRent, frequency);

                ledger.push({ startDate: startingMonth, endDate: endingMonth, amount });
            }

            const cutShortDays = edate.diff(sdate, "days");
            const cutShortPeriod = getCutShortPeriod(sdate, edate, cutShortDays, weeklyRent);

            if (cutShortPeriod) {
                ledger.push(cutShortPeriod);
            }
        }
    }
    logging.info(NAMESPACE, "Ledger for lease ", ledger);
    return ledger;
};

const getCutShortPeriod = (sdate, edate, cutShortDays, weeklyRent) => {
    if (cutShortDays > 0) {
        const cutShortStartDate = sdate.add(1, "d").toISOString();
        const cutShortEndDate = edate.toISOString();
        const amount = payment.getCutShortPayment(weeklyRent, cutShortDays);

        const cutShortPeriod = {
            startDate: cutShortStartDate,
            endDate: cutShortEndDate,
            amount
        };

        return cutShortPeriod;
    } else {
        return null;
    }
};

export default {
    getLedgerForLease
};
