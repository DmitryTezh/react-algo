import { invariant, memoize } from '../utils';
import { EvklidExtendedGCD } from '.';

const DIGITS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Преобразовать число из десятичной системы счисления в другую
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

// Вычислить обратный вычет x^(-1) по модулю
export const inverseNumberByModulo = (x: number, modulo: number): number => {
    const [,, y] = EvklidExtendedGCD(modulo, x);
    invariant((x * (y + modulo)) % modulo === 1);
    return y >= 0 ? y : y + modulo;
};

// Возвести число в степень по модулю
export const powerNumberByModulo = (num: number, power: number, modulo: number): number => {
    let result = 1;
    const bits = convertNumberToBase(power, 2);
    for (const bit of bits) {
        result *= result;
        if (bit === '1') {
            result *= num;
        }
        result %= modulo;
    }
    return result;
};

type ChineseRemainder = {
    m: number;
    r: number;
};

const calculateChineseBasis = memoize((M: number, modulos: number[]): Map<number, number> => {
    const basis: [number, number][] = modulos.map(m => {
        const Mm = M / m;
        const Mm1 = inverseNumberByModulo(Mm, m);
        return [m, Mm * Mm1];
    });
    return new Map(basis);
});

// Китайская теорема об остатках (КТО)
export const chineseRemainder = (remainders: ChineseRemainder[]): number => {
    const modulos = remainders.map(r => r.m);
    const M = modulos.reduce((M, m) => M * m);
    const basis = calculateChineseBasis(M, modulos);
    const R = remainders.reduce((R, { r, m }) => {
        return R + r * (basis.get(m) ?? 0);
    }, 0);
    return R % M;
};