# Serverless Message Board API

A backend API serving message board

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

## Installation

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

### Using Yarn

- Run `yarn` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS

## Test Locally

- Run `jest` to run unit tests, dynamoDb unit tests are not included at this point 

In order to test this API locally, you can either start up a offline API by runing:

- `serverless offline start`

Then functions can be invoked by using curl like:

create a board

```
curl --location --request POST 'https://localhost:3003/dev/boards' \
--header 'Content-Type: application/json' \
--data-raw '{
    "boardName": "new Board"
}'
```

create a user

```
curl --location --request POST 'http://localhost:3003/dev/users' --header 'Content-Type: application/json' --data-raw '{ "username": "Jingyi Gao", "email": "test@test.com" }'
```

create 
## Endpoints

This API has a number of endpoints hosted on AWS API Gateway

### User

#### `GET` Users

`/users`

Get all users 

<details>
<summary>Response</summary>

```json
{
    "users": [
        {
            "id": string,
            "username": string,
            "email": string,
            "createdAt": time
        }
    ]
}
```
</details>

#### `POST` User

`/users`

Create a new user

<details>
<summary>Body</summary>

```json
{
    "username": string,
    "email": string,
}
```
</details>

<details>
<summary>Response</summary>

```json
{
    "id": string,
    "username": string,
    "email": string,
    "createdAt": time
}
```
</details>

### Board

#### `GET` Boards

`/boards?userId=`

Get all message boards, can passing a user Id as query param to retrieve all boards a user has posted to

<details>
<summary>Response</summary>

```json
{
    "boards": [
        {
            "id": string,
            "name": string,
            "createdAt": time
        }
    ]
}
```
</details>

#### `POST` Board

`/boards`

Create a new message board

<details>
<summary>Body</summary>

```json
{
    "boardName": string
}
```
</details>

<details>
<summary>Response</summary>

```json
{
    "id": string,
    "name": string,
    "createdAt": time
}
```
</details>

### Message

#### `GET` Message

`/messages?boardId=&startFrom=&endAt`

Get all messages, by passing a boardId, it only returns messages that only posted in the given bord, by passing timestamp to get message posted between certain timestamps

<details>
<summary>Response</summary>

```json
{
    "message": [
        {
            "id": string,
            "userId": string,
            "content": string,
            "boardId": string,
            "createdAt": time
        }
    ]
}
```
</details>

#### `POST` Message

`/messages`

Create a new message

<details>
<summary>Body</summary>

```json
{
    "boardId": string,
    "userId": string,
    "content": string
}
```
</details>

<details>
<summary>Response</summary>

```json
{
    "id": string,
    "userId": string,
    "content": string,
    "boardId": string,
    "createdAt": time
}
```
</details>