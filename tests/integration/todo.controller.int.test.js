const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock-data/new-todo.json');

const endointUrl = '/api/todos';

const mongoose = require('mongoose');

describe(endointUrl, () => {
    it("POST " + endointUrl, async () => {
        const response = await request(app)
            .post(endointUrl)
            .send(newTodo);
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.done).toBe(newTodo.done);
    });

    it("should return error 500 on malformed data with POST" + endointUrl, async () => {
        const response = await request(app)
            .post(endointUrl)
            .send({title: "missing done property"});
        expect(response.statusCode).toBe(500);
        expect(response.body).toStrictEqual({
            Message: "Todo validation failed: done: Path `done` is required."
        }); 
    });
    
    test("GET " + endointUrl, async () => {
        const response = await request(app).get(endointUrl);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].done).toBeDefined();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });
});