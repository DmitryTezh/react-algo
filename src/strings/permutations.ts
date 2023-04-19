const evaluatePermutations = (elements: string[]): string[][] => {
    if (elements.length < 2) {
        return [elements];
    }
    if (elements.length === 2) {
        return [elements, elements.concat().reverse()];
    }
    const element = elements[elements.length - 1];
    const permutations = evaluatePermutations(elements.slice(0, -1));
    return permutations.flatMap(p => [
        ...p.map((el, index) => {
            const left = p.slice(0, index);
            const right = p.slice(index);
            const permutation = [...left, element, ...right];
            return permutation;
        }),
        [...p, element],
    ]);
};

export const getPermutations = (elements: string): string[][] => {
    return evaluatePermutations(elements.split(''));
};