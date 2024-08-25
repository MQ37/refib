import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = process.env.PORT || 3000;

// simple rec implementation
function fib(n: number): number {
    if (n <= 0) {
        return 0;
    } else if (n === 1) {
        return 1;
    } else {
        return fib(n - 1) + fib(n - 2);
    }
}
// fast implementation
/* 
 * Fast doubling Fibonacci algorithm (JavaScript)
 * by Project Nayuki, 2023. Public domain.
 * https://www.nayuki.io/page/fast-fibonacci-algorithms
 */
function fastfib(n: number): [number, number] {
	if (n === 0) {
		return [0, 1];
    }

    const [a, b] = fastfib(Math.floor(n / 2));
    const c = a * (b * 2 - a);
    const d = a * a + b * b;

    if (n % 2 === 0) {
        return [c, d];
    }

    return [d, c + d];
}

// store already computed values
const cache = new Map<number, number>();
app.get("/api/fib/:n", (req: Request, res: Response) => {
    const n = parseInt(req.params.n);

    if (isNaN(n) || n < 0) {
        return res.status(400).send("Invalid input");
    }
    if (n > 1476) {
        return res.status(400).send("Unreasonable");
    }

    if (cache.has(n)) {
        console.log(`cache hit for ${n}`);
        return res.send(cache.get(n)!.toString());
    }
    //const result = fib(n); // slow
    const result = fastfib(n)[0]; // fast
    cache.set(n, result);
    return res.send(result.toString());
});

app.listen(port, () => {
    console.log(`running @ :${port}`);
});

