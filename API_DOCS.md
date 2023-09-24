# User
## EndPoint
### GET /users/investors
#### Response: _200 Ok_
- Body 
```json
[
    {
        "id": 1,
        "username": "John Doe",
        "email": "invest@mail.com",
        "phoneNumber": "07142421424"
    },
    {
        "id": 2,
        "username": "investor",
        "email": "investor@mail.com",
        "phoneNumber": "0879899283"
    }
]
```
### GET /users/investors/:id
- Request params
```json
{
    "id": <integer>
}
```
#### Response: _200 Ok_
- Body
```json
{
    "id": 1,
    "username": "John Doe",
    "email": "invest@mail.com",
    "phoneNumber": "07142421424"
}
```
### POST /users/investors/register
- Request Body 
```json
{
    "username": "string",
    "email": "string",
    "password": "string",
    "phoneNumber": "string"
}
```
#### BadRequest: _400 BadRequest_
```json
{
    "message": "Username is required"
}
(or)
{
    "message": "Email is required"
}
(or)
{
    "message": "Password is required"
}
(or)
{
    "message": "Phone number is required"
}
(or)
{
    "message": "Email format wrong"
}
(or)
{
    "message": "Email must be unique"
}
```
#### Response: _201 Created_
- Body
```json
{
    "id": 2,
    "username": "investor",
    "email": "investor@mail.com",
    "phoneNumber": "0879899283"
}
```
### POST /users/investors/login
- Request Body
```json
{
    "email": "string",
    "password": "string"
}
```
#### BadRequest _400 BadRequest_
```json
{
    "message": "Email/Password required"
}
```
#### Response _200 Ok_
```json
{
    "access_token": "string",
    "id": 2
}
```
### GET /users/farmers/:id
- Request params
```json
{
    "id": "<integer>"
}
```
#### Response: _200 Ok_
- Body
```json
{
    "id": 1,
    "username": "string",
    "email": "string",
    "phoneNumber": "string",
    "address": "string"
}
```
### POST /users/farmers/register
- Request Body 
```json
{
    "username": "string",
    "email": "string",
    "password": "string",
    "phoneNumber": "string",
    "address": "string"
}
```
#### Response: _201 Created_
- Body
```json
{
    "id": 4,
    "username": "farmer",
    "email": "farmer@mail.com",
    "phoneNumber": "087376282",
    "address": "test"
}
```
#### BadRequest: _400 BadRequest_
- Body
```json
{
    "message": "Username is required"
}
(or)
{
    "message": "Email is required"
}
(or)
{
    "message": "Password is required"
}
(or)
{
    "message": "Phone number is required"
}
(or)
{
    "message": "Email format wrong"
}
(or)
{
    "message": "Email must be unique"
}
```
### POST /users/farmers/login
- Request Body
```json
{
    "email": "string",
    "password": "string"
}
```
#### BadRequest _400 BadRequest_
```json
{
    "message": "Email/Password required"
}
```
#### Response _200 Ok_
```json
{
    "access_token": "string",
    "id": 2
}
```
### PATCH /users/farmers/:id
- Request params
```json
{
    "id": <integer>
}
```
#### Response: _200 Ok_
- Body
```json
{
    "id": 1,
    "username": "Waryo",
    "email": "waryo@mail.com",
    "phoneNumber": "0813234344",
    "address": "string"
}
```

## Balance
### GET /balances/:balanceId
- Request params
```json
{
    "balanceId": <integer>
}
```
#### Response: _200 Ok_
- Body
```json
{
    "id": 1,
    "userId": 1,
    "balance": 100000,
    "status": "success",
    "Investor": {
        "id": 1,
        "username": "John Doe",
        "email": "invest@mail.com",
        "phoneNumber": "07142421424"
    }
}
```
### POST /balances
- Request Body
```json
{
    "userId": <integer>,
    "balance": integer,
    "status": "string"
}
```
#### Response: _200 Ok_
- Body
```json
{
    "id": 2,
    "userId": 2,
    "balance": 100,
    "status": "success"
}
```
### PUT /balances/status/:balanceId
- Request Body
```json
{
    "status": "success"
}
```
#### Response: _200 Ok_
- Body
```json
{
    "id": 2,
    "userId": 2,
    "balance": 100,
    "status": "success"
}
```

#### BadRequest: _400 BadRequest_
- Body
```json
{
    "message": "status is required"
}
```
### PATCH /balances/increments/:balanceId
- Request Body
```json
{
    "balance": integer
}
```
#### Response: _200 Ok_
- Body 
```json
{
    "message": "success add balance",
    "data": {
        "id": 1,
        "userId": 1,
        "balance": 110000,
        "status": "success"
    }
}
```
#### BadRequest: _400 BadRequest_
```json
{
    "message": "balance must be positif number"
}
```
### PATCH /balances/decrements/:balanceId
- Request Body
```json
{
    "balance": integer
}
```
#### Response: _200 Ok_
- Body 
```json
{
    "message": "success add balance",
    "data": {
        "id": 1,
        "userId": 1,
        "balance": 110000,
        "status": "success"
    }
}
```
#### BadRequest: _400 BadRequest_
```json
{
    "message": "balance must be positif number"
}
```
### DELETE /balances/balanceId
- Request params
```json
{
    "balanceId": integer
}
```
#### Response: _200 Ok_
```json
{
    "message": "deleted balance success",
    "data": {
        "id": 2,
        "userId": 2,
        "balance": 100,
        "status": "success"
    }
}
```
### POST /balances/payments-token
- Request Body
```json
{ 
    "total": integer, 
    "username": "string"
} 
```
#### Response: _200 Ok_
- Body
```json
{
    "token": "3b78fd0f-4436-4d40-b2b8-da598b858533",
    "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/redirection/3b78fd0f-4436-4d40-b2b8-da598b858533"
}
```
#### BadResponse: _400 BadRequest_
```json
{
    "message": "total is required"
}
(or)
{
    "message": "username is required"
}
```
# Farm
## EndPoint
### GET /farms
### GET /farms/my-farms/farm
### POST /farms/my-farms/farm
### DELETE /farms/my-farms/:farmId
### GET /farms/:farmId
### GET /farms/my-farms/:farmId
### PATCH /farms/:farmId

# Report
## EndPoint
### GET /reports
### POST /reports
### GET /reports/:id