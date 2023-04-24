import { factorial, powerNumberByModulo } from '.';
import { invariant, once } from '../utils';

// Алгоритм проверки числа на простоту через теорему о наименьшем делителе
export const isExactlyPrime = (p: number): boolean => {
    const maxDivider = Math.floor(Math.sqrt(p));
    for (let divider = 2; divider <= maxDivider; divider++) {
        if (p % divider === 0) {
            return false;
        }
    }
    return true;
};

// Тест Ферма на простоту
export const isFermatPrime = (p: number): boolean => {
    // Все четные числа, кроме 2 - составные
    if (p % 2 === 0) {
        return p === 2;
    }
    const power = powerNumberByModulo(2, p - 1, p);
    // Простое или псевдо-простое число (число Кармайкла) - нужна дополнительная проверка
    if (power === 1) {
        return isExactlyPrime(p);
    }
    return false;
};

// Тест Вильсона на простоту
export const isWilsonPrime = (p: number): boolean => {
    // Все четные числа, кроме 2 - составные
    if (p % 2 === 0) {
        return p === 2;
    }
    const fact = factorial(p - 1);
    return (fact + 1) % p === 0;
};

// Простые числа Ферма вида 2 ^ 2 ^ k + 1
type FermatPrimeIndices = '0' | '1' | '2' | '3' | '4';
type FermatPrimeKey<key extends FermatPrimeIndices = FermatPrimeIndices> = `F${key}`;
type FermatPrimeNumbers = {
    [key in FermatPrimeKey]: number;
};

// Генератор чисел Ферма
const FermatNumberGenerator = (k: number): number => {
    return 2 ** 2 ** k + 1;
};

// Все известные простые числа Ферма
export const FermatPrimes = once((): FermatPrimeNumbers => {
    const fermatPrimes: FermatPrimeNumbers = Array(5)
        .fill(0)
        .reduce((f, v, index) => {
            f[`F${index}`] = FermatNumberGenerator(index);
            return f;
        }, {});
    invariant(Object.values(fermatPrimes).every(f => isFermatPrime(f)));
    return fermatPrimes;
});

// Алгоритм решета Эратосфена
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
    invariant(primes.every(p => isExactlyPrime(p)));
    return primes;
};
