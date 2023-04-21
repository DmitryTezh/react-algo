import { bitsOf, EratosthenesPrimes, FermatPrimes, inverseNumberByModulo } from '../numbers';
import { invariant } from '../utils';

export interface KeyPair {
    publicKey: {
        e: number,  // public exponent
        n: number,  // modulo
    },
    privateKey: {
        d: number,  // secret exponent
        n: number,  // modulo
        p?: number, // 1st prime number
        q?: number, // 2nd prime number
    },
}

export interface KeyOptions {
    keyLength: number,
    includePrimesInPrivateKey?: boolean,
}

const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateKeys = (options: KeyOptions): KeyPair => {
    const { keyLength, includePrimesInPrivateKey } = options;
    invariant(keyLength <= 20);
    const primes = EratosthenesPrimes(2 ** (keyLength + 1) - 1).filter(p => bitsOf(p, 2) === keyLength);
    invariant(primes.length > 0);
    const p = primes[random(0, primes.length)];
    const q = primes[random(0, primes.length)];
    invariant(p !== q);
    const modulo = p * q;
    const phi = (p - 1) * (q - 1);
    const publicKey = {
        e: FermatPrimes().F3,
        n: modulo,
    };
    const privateKey = {
        d: inverseNumberByModulo(publicKey.e, phi),
        n: modulo,
        ...(includePrimesInPrivateKey && { p, q }),
    };
    return {
        publicKey,
        privateKey,
    };
};