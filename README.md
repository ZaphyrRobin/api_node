# About

A simple Node.js + Express API to retrieve user data from a MongoDB database.

## Requirements

- Node.js >= 14
- MongoDB instance

## Setup

### 1. Clone & Install

```
git clone git@github.com:ZaphyrRobin/api_node.git
cd api_node
npm install
```

### 2. Environment Variables
Create a .env file:

replace test to the local database name
```
MONGODB_URI=mongodb://localhost:27017/test
PORT=3000
```

### 3. Insert doc to Mongodb
```
mongosh
test> db.users.insertOne({ name: "John Doe", email: "johndoe@email.com", age: 30 })
{
  acknowledged: true,
  insertedId: ObjectId('6843501b4ec433632804757d')
}
test>
```

### 3. Start the Server
Server is at http://localhost:3000

```
npm start
```

### 4. API Example

GET /users/:id

```
curl http://localhost:3000/users/6843501b4ec433632804757d
> {"_id":"6843501b4ec433632804757d","name":"John Doe","email":"johndoe@email.com","age":30}
```

### 5. Run Tests

```
npm test
```
