import logging from "../utils/logging";
import { Frequency } from "../models/payment-frequency";

const NAMESPACE = "Sample Service";

const getPayment = (weeklyRent, frequency) => {
    let amount = 0;

    if (frequency == Frequency.WEEKLY) {
        amount = +weeklyRent;
    } else if (frequency == Frequency.FORTNIGHTLY) {
        amount = +weeklyRent * 2;
    } else if (frequency == Frequency.MONTHLY) {
        amount = ((+weeklyRent / 7) * 365) / 12;
    }

    return Math.round((amount + Number.EPSILON) * 100) / 100;
};

const getCutShortPayment = (weeklyRent, days) => {
    let amount = 0;
    amount = (+weeklyRent / 7) * days;
    return Math.round((amount + Number.EPSILON) * 100) / 100;
};

export { getPayment, getCutShortPayment };
