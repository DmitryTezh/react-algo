export const invariant = (condition: boolean, error: string) => {
    if (!condition) {
        throw Error(error);
    }
};