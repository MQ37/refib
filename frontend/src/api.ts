export async function fetchFib(n: number): Promise<bigint> {
    const response = await fetch(`/api/fib/${n}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch fib(${n})`);
    }

    const text = await response.text();
    return BigInt(text);
}

