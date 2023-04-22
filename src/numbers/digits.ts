// Посчитать сумму цифр целого числа
export const sumOfDigits = (num: number): number => {
    let digits = 0;
    let remainder = num;
    while (remainder > 0) {
        digits += remainder % 10;
        remainder = Math.floor(remainder / 10);
    }
    return digits;
};

// Посчитать разрядность целого числа в системе счисления
export const bitsOf = (num: number, base: number): number => {
    let bits = -1;
    let remainder = num;
    while (remainder > 0) {
        bits++;
        remainder = Math.floor(remainder / base);
    }
    return bits;
};