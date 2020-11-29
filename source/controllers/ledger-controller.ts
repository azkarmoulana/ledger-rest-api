import { Request, Response, NextFunction } from "express";
import logging from "../utils/logging";
import ledgerService from "../services/ledger-service";

const NAMESPACE = "Ledger Controller";

const getLedgerForLease = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `Ledger controller called.`);

    const params = req.query;

    if (params.start_date && params.end_date && params.frequency && params.weekly_rent && params.timezone) {
        const ledgerForLease = ledgerService.getLedgerForLease(params.start_date, params.end_date, params.frequency, params.weekly_rent, params.timezone);

        return res.status(200).json(ledgerForLease);
    } else {
        return res.status(400).json({ message: "Incorrect parameters" });
    }
};

export default {
    getLedgerForLease
};
