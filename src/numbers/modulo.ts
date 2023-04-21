import { invariant } from '../utils';
import { EvklidExtendedGCD } from '.';

const DIGITS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const convertNumberToBase = (num: number, base: number) => {
    invariant(base <= DIGITS.length);
    let result = '';
    let remainder = num;
    while (remainder > 0) {
        result = DIGITS[remainder % base] + result;
        remainder = Math.floor(remainder / base);
    }
    return result;
};

export const inverseNumberByModulo = (x: number, modulo: number): number => {
    const [,, y] = EvklidExtendedGCD(modulo, x);
    invariant((x * (y + modulo)) % modulo === 1);
    return y > 0 ? y : y + modulo;
};

export const powerNumberByModulo = (num: number, power: number, modulo: number): number => {
    let result = num;
    const bits = convertNumberToBase(power, 2);
    for (let i = bits.length - 2; i >= 0; i--) {
        result *= result;
        if (bits[i+1] === '1') {
            result *= num;
        }
        result %= modulo;
    }
    return result;
};