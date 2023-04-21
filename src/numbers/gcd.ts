export const EvklidGCD = (a: number, b: number): number => {
    let divisible = Math.max(a, b);
    let divider = Math.min(a, b);
    let remainder = divisible % divider;
    while (remainder > 0) {
        divisible = divider;
        divider = remainder;
        remainder = divisible % divider;
    }
    return divider;
};

export const EvklidExtendedGCD = (a: number, b: number): [number, number, number] => {
    if (b === 0) {
        return [a, 1, 0];
    }
    const [d, x, y] = EvklidExtendedGCD(b, a % b);
    return [d, y, x - y * Math.floor(a / b)];
};
