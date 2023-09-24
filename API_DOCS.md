# Users
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
#### Response: _200 Ok_
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
#### Response: _200 Ok_
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

# Balance
## EndPoint
### GET /balances
### POST /balances
### PUT /balances/status/:balanceId
### PATCH /balances/increments/:balanceId
### PATCH /balances/decrements/:balanceId
### DELETE /balances
### POST /balances/payments-token

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