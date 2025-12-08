import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minToDuration',
  standalone: true
})
export class MinToDurationPipe implements PipeTransform {
  transform(minutes?: number): string {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const min = minutes % 60;
    return `${hours}h ${min}min`
  }
}
