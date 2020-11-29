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
- `404`: API endpoint not found (check for the correct API endpoint)
- `400`: Bad request (check for the query params provided)
- `200`: Success

__*Sample request*__   
- Request: 
`/api/lease/ledger?start_date=2020-01-25T00:00:00.000Z&end_date=2020-05-08T00:00:00.000Z&frequency=MONTHLY&weekly_rent=550&timezone=Australia/Sydney`  

- Response:  
```json
[
    {
        "startDate": "2020-01-25T00:00:00.000Z",
        "endDate": "2020-02-25T00:00:00.000Z",
        "amount": 2389.88
    },
    {
        "startDate": "2020-02-25T00:00:00.000Z",
        "endDate": "2020-03-25T00:00:00.000Z",
        "amount": 2389.88
    },
    {
        "startDate": "2020-03-25T00:00:00.000Z",
        "endDate": "2020-04-25T01:00:00.000Z",
        "amount": 2389.88
    },
    {
        "startDate": "2020-04-26T01:00:00.000Z",
        "endDate": "2020-05-08T00:00:00.000Z",
        "amount": 942.86
    }
]
```  

### Running unit tests  
Unit tests are written using [Jest](https://jestjs.io/)
1. Run `npm test` to run the unit tests
