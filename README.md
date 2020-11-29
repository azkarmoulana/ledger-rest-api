## Ledger REST API
---

#### How to run the app locally
1. run `npm install` to install all the required dependencies
2. run `npm run start` to start the application
`

#### API endpoints
Path: `/api/lease/ledger?start_date={START_DATE}&end_date={END_DATE}&frequency={FREQUENCY}&weekly_rent={WEEKLY_RENT}&timezone={TIMEZONE}`
Required parameters:
    `start_date`: starting date of the ledger (ISO String format)
    `end_date`: ending date of the ledger (ISO String format)
    `frequency`: payment frequency of the ledger
