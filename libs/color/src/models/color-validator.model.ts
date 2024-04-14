export class ColorValidator {
  static validateColor(color: string): void {
    const style = new Option().style;
    style.color = color;
    if (!style.color) {
      throw new Error('Invalid color format');
    }
  }
}
