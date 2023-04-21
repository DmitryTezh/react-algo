import { factorial, powerNumberByModulo } from '.';

export const isExactlyPrime = (p: number): boolean => {
    const maxDivider = Math.floor(Math.sqrt(p));
    for (let divider = 2; divider <= maxDivider; divider++) {
        if (p % divider === 0) {
            return false;
        }
    }
    return true;
};

export const isFermatPrime = (p: number): boolean => {
    if (p % 2 === 0) {
        return true;
    }
    const power = powerNumberByModulo(2, p - 1, p);
    return power === 1;
};

export const isWilsonPrime = (p: number): boolean => {
    if (p % 2 === 0) {
        return true;
    }
    const fact = factorial(p - 1);
    return (fact + 1) % p === 0;
};

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
