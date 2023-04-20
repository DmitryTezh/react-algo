import { invariant } from '../utils';
import { EvklidExtendedGCD } from './primes';

export const InverseNumberByModulo = (x: number, modulo: number): number => {
    const [,, y] = EvklidExtendedGCD(modulo, x);
    invariant((x * y) % modulo === 1);
    return y;
};

export const convertNumberToBase = (num: number, base: number) => {
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    invariant(base <= digits.length);
    let result = '';
    let remainder = num;
    while (remainder > 0) {
        result = digits[remainder % base] + result;
        remainder = Math.floor(remainder / base);
    }
    return result;
};

export const powerByModulo = (num: number, power: number, modulo: number): number => {
    let result = num;
    const bits = convertNumberToBase(power, 2);
    for (let i = bits.length - 2; i >= 0; i--) {
        result *= result;
        if (bits[i+1] === '1') {
            result *= num;
        }
        result %= modulo;
        console.warn(result)
    }
    return result;
};