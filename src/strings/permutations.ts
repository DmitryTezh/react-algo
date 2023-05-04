const swapArray = (elements: string[], i: number, j: number): string[] => {
    const copy = [...elements];
    if (i !== j) {
        const temp = copy[i];
        copy[i] = copy[j];
        copy[j] = temp;
    }
    return copy;
};

const permute = (elements: string[], onlyUnique?: boolean): string[][] => {
    const seen = onlyUnique ? new Set<string>([elements.join('')]) : undefined;
    const allPermutations: string[][] = [elements];
    for (let i = 0; i < elements.length - 1; i++) {
        const levelPermutations: string[][] = [];
        for (const permutation of allPermutations) {
            for (let j = i + 1; j < elements.length; j++) {
                const swapPermutation = swapArray(permutation, i, j);
                const key = swapPermutation.join('');
                if (seen == null || !seen.has(key)) {
                    seen?.add(key);
                    levelPermutations.push(swapPermutation);
                }
            }
        }
        allPermutations.push(...levelPermutations);
    }
    return allPermutations;
};

const permuteRecursion = (elements: string[]): string[][] => {
    if (elements.length === 1) {
        return [elements];
    }
    const element = elements[elements.length - 1];
    return permuteRecursion(elements.slice(0, -1)).flatMap(p => [
        ...p.map((_, index) => [...p.slice(0, index), element, ...p.slice(index)]),
        [...p, element],
    ]);
};

// Все перестановки множества
export const permutations = (elements: string, onlyUnique?: boolean): string[][] => {
    return permute(elements.split(''), onlyUnique);
};