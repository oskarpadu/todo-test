const request = require('supertest');
const app = require('../../app');
const newTodo = require('../mock-data/new-todo.json');

const endointUrl = '/api/todos';

const mongoose = require('mongoose');

let firstTodo, newTodoId;
const testData = {
    title: "Make integration test for PUT",
    done: true
};
const notExistingId = "69e5fe7f27ab7bd0ccebf1bd";

describe(endointUrl, () => {
    it("POST " + endointUrl, async () => {
        const response = await request(app)
            .post(endointUrl)
            .send(newTodo);
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
        expect(response.body.done).toBe(newTodo.done);
        newTodoId = response.body._id;
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

    it("PUT " + endointUrl, async () => {
        const testData = {title: "updated title", done: true};
        const res = await request(app)
            .put(endointUrl + "/" + newTodoId)
            .send(testData);
        expect(res.statusCode).toBe(200);
        expect(res.body.title).toBe(testData.title);
        expect(res.body.done).toBe(testData.done);
    });

    it("should return 404 on PUT " + endointUrl, async () => {
        const res = await request(app)
            .put(endointUrl + "/" + notExistingId)
            .send(testData);
        expect(res.statusCode).toBe(404);
    });
    
    test("GET " + endointUrl, async () => {
        const response = await request(app).get(endointUrl);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body[0].title).toBeDefined();
        expect(response.body[0].done).toBeDefined();
        firstTodo = response.body[0];
    });

    test("GET " + endointUrl + "/:todoId", async () => {
        const response = await request(app).get(endointUrl + "/" + firstTodo._id);
        expect(response.statusCode).toBe(200);
        expect(response.body.title).toBe(firstTodo.title);
        expect(response.body.done).toBe(firstTodo.done);
    });

    test("GET todoby id doesn't exist " + endointUrl + "/:todoId", async () => {
        const response = await request(app).get(endointUrl + "/69e5fe7f27ab7bd0ccebf1bd");
        expect(response.statusCode).toBe(404);
    });
    

    afterAll(async () => {
        await mongoose.connection.close();
    });
});