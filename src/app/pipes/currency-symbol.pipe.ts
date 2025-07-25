import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencySymbol',
  standalone: true,
})
export class CurrencySymbolPipe implements PipeTransform {
  transform(amount: number, currency: string): string {
    return `${currency}${amount}`;
  }
}
