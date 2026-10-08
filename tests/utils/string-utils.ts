export const NUMBER_REGEX = /\d+(?:\.\d+)?/;

export function extractNumber(text: string | null): number {
    const match = text?.match(NUMBER_REGEX);

    if (!match) {
        throw new Error(`Unable to extract number from: "${text}"`);
    }

    return Number(match[0]);
}