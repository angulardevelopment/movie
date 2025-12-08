import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'millionDollar',
  standalone: true
})
export class MillionDollarPipe implements PipeTransform {
  transform(amount?: string | number): string {
    let range = ""+amount;
    let split = range?.split("-") ?? [];
    if (split.length > 1) {
      range = split[0] + " to $" + split[1];
    }
    return `$${ range } million`
  }
}
