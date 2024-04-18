import { IColorFormatDetector } from '../interfaces';
import { ColorFormat } from '../types';

class ColorFormatDetector implements IColorFormatDetector {
  public determineFormat(color: string): ColorFormat {
    if (color.startsWith('#')) return 'hex';
    if (color.startsWith('rgb')) return color.includes('rgba') ? 'rgba' : 'rgb';
    if (color.startsWith('hsl')) return color.includes('hsla') ? 'hsla' : 'hsl';
    throw new Error('Unknown color format');
  }
}
