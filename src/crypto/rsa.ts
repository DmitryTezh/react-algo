import {
    bitsOf,
    chineseRemainder,
    EratosthenesPrimes,
    FermatPrimes,
    inverseNumberByModulo,
    powerNumberByModulo,
} from '../numbers';
import { invariant } from '../utils';

export interface PublicKey {
    e: number;  // public exponent
    n: number;  // modulo
}

export interface PrivateKey {
    d: number;  // secret exponent
    n: number;  // modulo
    p?: number; // 1st prime number
    q?: number; // 2nd prime number
}

export interface KeyPair {
    publicKey: PublicKey,
    privateKey: PrivateKey,
}

export interface KeyOptions {
    keyLength: number;
    includePrimesInPrivateKey?: boolean;
}

const random = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateKeys = (options: KeyOptions): KeyPair => {
    const { keyLength, includePrimesInPrivateKey } = options;
    invariant(keyLength <= 10, 'RSA violation: Key length exceeded');

    const primes = EratosthenesPrimes(2 ** (keyLength + 1) - 1).filter(p => bitsOf(p, 2) === keyLength);
    invariant(primes.length > 0, 'RSA violation: No primes found');

    const p = primes[random(0, primes.length)];
    let q = primes[random(0, primes.length)];
    let i = 0;
    while (p === q && i++ < 10) {
        q = primes[random(0, primes.length)];
    }
    invariant(p !== q, 'RSA violation: Equal primes prohibited');

    const modulo = p * q;
    const phi = (p - 1) * (q - 1);
    const publicKey: PublicKey = {
        e: FermatPrimes().F3,
        n: modulo,
    };
    const privateKey: PrivateKey = {
        d: inverseNumberByModulo(publicKey.e, phi),
        n: modulo,
        ...(includePrimesInPrivateKey && { p, q }),
    };

    return {
        publicKey,
        privateKey,
    };
};

export const encrypt = (num: number, pub: PublicKey): number => {
    const { e, n } = pub;
    invariant(num < n, 'RSA violation: Encrypting value must not exceed modulo');
    return powerNumberByModulo(num, e, n);
};

export const decrypt = (num: number, ppk: PrivateKey): number => {
    const { d, n, p, q } = ppk;
    invariant(num < n, 'RSA violation: Decrypting value must not exceed modulo');
    if (p == null || q == null) {
        return powerNumberByModulo(num, d, n);
    }
    const a = powerNumberByModulo(num, d, p);
    const b = powerNumberByModulo(num, d, q);
    return chineseRemainder([
        { r: a, m: p },
        { r: b, m: q },
    ]);
};