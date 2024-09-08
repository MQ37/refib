import { useState } from 'react';
import './App.css';
import { fetchFib } from './api';

function App() {

    const [number, setNumber] = useState<number>(0);
    const [result, setResult] = useState<bigint | null>(null);

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const input = e.currentTarget.number as HTMLInputElement;
        const value = parseInt(input.value);
        if (isNaN(value)) {
            return;
        }

        try {
            const res = await fetchFib(value);
            setNumber(value);
            setResult(res);
        } catch (e) {
            console.error(e);
            alert("Something went wrong");
        }
    }

    return (
            <main>

                <h1>ReFib</h1>

                <form onSubmit={submit}>
                    <label htmlFor="number">
                        Enter a number:
                    </label>
                    <input type="number" id="number" name="number"
                    min="0" max="1476" required />

                    <button>Submit</button>
                </form>

                <p style={{
                    maxWidth: '50%',
                    margin: '0 auto',
                    wordWrap: 'break-word'
                    }}>
                    {
                        result !== null ?
                        `Fib(${number}) = ${result}`
                        :
                        '🤔'
                    }
                </p>

            </main>
           )
}

export default App;

