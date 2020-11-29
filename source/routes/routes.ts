import experss from "express";
import ledgerController from "../controllers/ledger-controller";

const router = experss.Router();

router.get("/lease/ledger", ledgerController.getLedgerForLease);

export = router;
