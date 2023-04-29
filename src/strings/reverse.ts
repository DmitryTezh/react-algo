// Перевернуть текст
export const reverse = (text: string): string => {
    const chars = text.split('');
    for (let i = 0; i <= Math.floor(chars.length / 2); i++) {
        const temp = chars[i];
        chars[i] = chars[chars.length - i - 1];
        chars[chars.length - i - 1] = temp;
    }
    return chars.join('');
};