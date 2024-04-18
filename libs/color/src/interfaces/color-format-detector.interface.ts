import { ColorFormat } from '../types';

export interface IColorFormatDetector {
  determineFormat(color: string): ColorFormat;
}
