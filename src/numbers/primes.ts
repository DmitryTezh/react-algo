export const EratosthenesPrimes = (num: number): number[] => {
    const numbers = Array(num - 1).fill(0).map((n, i) => i + 2);
    let divider = 2;
    const maxDivider = Math.floor(Math.sqrt(num));
    while (divider <= maxDivider) {
        for (let i = 2 * divider - 2; i < numbers.length; i += divider) {
            numbers[i] = 0;
        }
        divider++;
    }
    const primes = numbers.filter(n => n !== 0);
    return primes;
};

export const EvklidGCD = (a: number, b: number): number => {
    let divisible = Math.max(a, b);
    let divider = Math.min(a, b);
    let remainder = divisible % divider;
    while (remainder > 0) {
        divisible = divider;
        divider = remainder;
        remainder = divisible % divider;
    }
    return divider;
};

export const EvklidExtendedGCD = (a: number, b: number): [number, number, number] => {
    if (b === 0) {
        return [a, 1, 0];
    }
    const [d, x, y] = EvklidExtendedGCD(b, a % b);
    return [d, y, x - y * Math.floor(a / b)];
};