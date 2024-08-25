export async function fetchFib(n: number): Promise<number> {
    const response = await fetch(`/api/fib/${n}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch fib(${n})`);
    }

    const data = await response.text();
    const result = parseFloat(data);
    return result;
}

