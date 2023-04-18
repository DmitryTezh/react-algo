export const resolveABCD = (power: number): number => {
    let counter = 0;
    const results = new Map<number, [number, number][]>();

    for (let a = 0; a<1000; a++) {
        for (let b = 0; b<1000; b++) {
            const value = a ** power + b ** power;
            const pairs = results.get(value) ?? [];
            let ignore = false;
            for (const pair of pairs) {
                if (pair.includes(a) && pair.includes(b)) {
                    ignore = true;
                    break;
                }
            }
            if (ignore) {
                continue;
            }
            pairs.push([a, b]);
            results.set(value, pairs);
        }
    }

    for (const pairs of results.values()) {
        for (let i = 0; i<pairs.length; i++) {
            const leftPair = pairs[i];
            for (let j = i + 1; j<pairs.length; j++) {
                const rightPair = pairs[j];
                console.warn([...leftPair, ...rightPair]);
                counter++;
            }
        }
    }

    return counter;
}