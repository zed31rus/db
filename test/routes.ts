import test from "node:test";
import fastifyInstance from "#web/webServer";
import assert from "node:assert";

test('POST /auth/login/', async (t) => {
    const response = await fastifyInstance.inject({
        method: "GET",
        url: '/auth/login'
    })
    assert.strictEqual(response.statusCode, 200);
    assert.deepStrictEqual(response.json(), { status: 'ok' });
})