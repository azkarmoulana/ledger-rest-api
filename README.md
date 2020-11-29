# Ledger REST API
---

### How to run the app locally
1. Run `npm install` to install all the required dependencies
2. Run `npm run start` to start the application

### API endpoints
**Request**

- Path: `/api/lease/ledger?start_date={START_DATE}&end_date={END_DATE}&frequency={FREQUENCY}&weekly_rent={WEEKLY_RENT}&timezone={TIMEZONE}`  
- Method: `GET`  
- Required parameters:  
  - `start_date`: starting date of the ledger (ISO String format)  
  - `end_date`: ending date of the ledger (ISO String format)  
  - `frequency`: payment frequency of the ledger (`WEEKLY` or `FORTNIGHTLY` or `MONTHLY`)  
  - `weekly_rent`: weekly amout of the ledger (number)  
  - `timezone`: timezone of the property (as a string of TZ database name, ex :- `Australia/Sydney`)  

**Response**
- Array of line items, each item includes
  - `startDate`: starting date of the line item (ISO String format)
  - `endDate`: ending date of the line item (ISO String format)
  - `amount`: total amout of the line item (number)

**Possible response codes**
- `404`: API endpoint not found (check the correct API endpoint)
- `400`: Bad request (check the query params provided)
- `200`: Success

