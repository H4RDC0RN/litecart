type Rgb = { r: number; g: number; b: number };

export function parseRgb(color: string): Rgb {
    const parts = color.match(/\d+(\.\d+)?/g)?.map(Number);
    if (!parts || parts.length < 3) throw new Error(`Unsupported color format: "${color}"`);
    const [r, g, b] = parts;
    return { r, g, b };
}

export function isReddish(color: string): boolean {
    const { r, g, b } = parseRgb(color);
    return r >= 200 && r - Math.max(g, b) >= 40;
}