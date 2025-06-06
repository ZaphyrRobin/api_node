const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server');
const User = require('../models/User');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri(), { dbName: 'test' });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    await User.deleteMany();
});

describe('GET /users/:id', () => {
    it('should return user data if user exists and age > 21', async () => {
        const user = await User.create({ name: 'Alice', email: 'alice@test.com', age: 25 });

        const res = await request(app).get(`/users/${user._id}`);
        expect(res.status).toBe(200);
        expect(res.body.name).toBe('Alice');
    });

    it('should return 404 if user does not exist', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const res = await request(app).get(`/users/${fakeId}`);
        expect(res.status).toBe(404);
    });

    it('should return 404 if age <= 21', async () => {
        const user = await User.create({ name: 'Bob', email: 'bob@test.com', age: 20 });
        const res = await request(app).get(`/users/${user._id}`);
        expect(res.status).toBe(404);
    });

    it('should return 400 for invalid ObjectId', async () => {
        const res = await request(app).get('/users/invalid-id');
        expect(res.status).toBe(400);
        expect(res.body.error).toBe('Invalid user ID');
    });
});
