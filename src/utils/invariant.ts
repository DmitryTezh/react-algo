export const invariant = (condition: boolean, error?: string) => {
    if (condition) {
        return;
    }
    throw Error(error ?? 'Invariant broken');
};