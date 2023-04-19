export const reverse = (num: number): number => {
    let remainder = num;
    const digits: number[] = [];
    while (remainder > 0) {
        const digit = remainder % 10;
        digits.push(digit);
        remainder = (remainder - digit) / 10;
    }
    return digits.reverse().reduce((sum, digit, index) => {
        return sum + digit * 10 ** index;
    }, 0);
};