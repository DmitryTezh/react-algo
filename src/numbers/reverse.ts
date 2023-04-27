// Перевернуть целое число
export const reverse = (num: number): number => {
    let result = 0;
    let remainder = num;
    const sign = Math.sign(num);
    while (remainder > 0) {
        const digit = remainder % 10;
        result = result * 10 + sign * digit;
        remainder = Math.floor(remainder / 10);
    }
    return result;
};