import request from 'supertest';
import { app, closeServer } from './index';

describe('GET /api/fib/:n', () => {

    afterAll(() => {
        closeServer();
    });

    it('n=0', async () => {
        const res = await request(app).get('/api/fib/0');
        expect(res.status).toBe(200);
        expect(res.text).toBe('0');
    });

    it('n=1', async () => {
        const res = await request(app).get('/api/fib/1');
        expect(res.status).toBe(200);
        expect(res.text).toBe('1');
    });

    it('n=10', async () => {
        const res = await request(app).get('/api/fib/10');
        expect(res.status).toBe(200);
        expect(res.text).toBe('55');
    });

    it('n=50', async () => {
        const res = await request(app).get('/api/fib/50');
        expect(res.status).toBe(200);
        expect(res.text).toBe('12586269025');
    });

    it('n=100', async () => {
        const res = await request(app).get('/api/fib/100');
        expect(res.status).toBe(200);
        expect(res.text).toBe('354224848179261915075');
    });

    it('n=900', async () => {
        const res = await request(app).get('/api/fib/900');
        expect(res.status).toBe(200);
        expect(res.text).toBe('54877108839480000051413673948383714443800519309123592724494953427039811201064341234954387521525390615504949092187441218246679104731442473022013980160407007017175697317900483275246652938800');
    });

    it('n=1337', async () => {
        const res = await request(app).get('/api/fib/1337');
        expect(res.status).toBe(200);
        expect(res.text).toBe('1166782782969257491619153740434791503598234290741291359406061212397345887252545157833399269855824772839341106446209993475918896282003637549042932817693993792294375837384925771418274778734420597627415942373411818041261373335700249267727594511569151368792111912361418558537679167117');
    });

    it('400 for negative input', async () => {
        const res = await request(app).get('/api/fib/-1');
        expect(res.status).toBe(400);
        expect(res.text).toBe('Invalid input');
    });

    it('400 for non-numeric input', async () => {
        const res = await request(app).get('/api/fib/abc');
        expect(res.status).toBe(400);
        expect(res.text).toBe('Invalid input');
    });

    it('400 for input > 1476', async () => {
        const res = await request(app).get('/api/fib/1477');
        expect(res.status).toBe(400);
        expect(res.text).toBe('Unreasonable');
    });
});
