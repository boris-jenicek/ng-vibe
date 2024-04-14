type ColorFormat = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla';

export class Color {
  public readonly color: string;
  private format: ColorFormat;

  constructor(color: string) {
    this.validateColor(color); // Validate and ignore the returned style color
    this.format = this.determineFormat(color);
    this.color = color; // Store the original color
  }

  private validateColor(color: string): void {
    const style = new Option().style;
    style.color = color;
    if (!style.color) throw new Error('Invalid color format');
    // We don't use `style.color` because it normalizes the input to RGB/RGBA
  }

  private determineFormat(color: string): ColorFormat {
    if (color.startsWith('#')) return 'hex';
    if (color.startsWith('rgb')) return color.includes('rgba') ? 'rgba' : 'rgb';
    if (color.startsWith('hsl')) return color.includes('hsla') ? 'hsla' : 'hsl';
    throw new Error('Unknown color format');
  }

  public lighten(percentage: number): string {
    return this.adjustBrightness(percentage);
  }

  public darken(percentage: number): string {
    return this.adjustBrightness(-percentage);
  }

  public adjustBrightness(percentage: number): string {
    let [r, g, b, a = 1] = this.parseColor();

    const adjustmentFactor = 1 + percentage / 100;

    r = Math.round(Math.min(255, Math.max(0, r * adjustmentFactor)));
    g = Math.round(Math.min(255, Math.max(0, g * adjustmentFactor)));
    b = Math.round(Math.min(255, Math.max(0, b * adjustmentFactor)));

    if (this.format === 'rgba') {
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
  }

  public transparentize(percentage: number): string {
    let [r, g, b, a = 1] = this.parseColor();
    a *= (100 - percentage) / 100;
    return `rgba(${r},${g},${b},${a.toFixed(2)})`;
  }

  private parseColor(): number[] {
    if (this.format === 'hex') {
      return this.hexToRgb(this.color);
    } else if (this.format === 'rgb' || this.format === 'rgba') {
      const result = this.color.match(/\d+(\.\d+)?/g);
      if (!result) {
        throw new Error('Failed to parse color');
      }
      const values = result.map(Number);
      if (this.format === 'rgba' && values.length === 3) {
        values.push(1); // Default alpha value for RGB (assumed as opaque)
      }
      return values;
    }
    throw new Error('Unsupported color format');
  }

  private hexToRgb(hex: string): number[] {
    console.log(hex);
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((char) => char + char)
        .join('');
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return [r, g, b];
  }
}
