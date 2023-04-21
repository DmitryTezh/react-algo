import { factorial, powerNumberByModulo } from '.';
import { invariant } from '../utils';

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

type FermatPrimeIndices = '0' | '1' | '2' | '3' | '4';
type FermatPrimeKey<key extends FermatPrimeIndices = FermatPrimeIndices> = `F${key}`;
type FermatPrimeNumbers = {
    [key in FermatPrimeKey]: number;
};

const FermatNumberGenerator = (k: number): number => {
    return 2 ** 2 ** k + 1;
};

export const FermatPrimes = (): FermatPrimeNumbers => {
    const fermatPrimes: FermatPrimeNumbers = Array(5).fill(0).reduce((f, v, index) => {
        f[`F${index}`] = FermatNumberGenerator(index);
        return f;
    }, {});
    invariant(Object.values(fermatPrimes).every(f => isExactlyPrime(f)));
    return fermatPrimes;
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
