import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'humanize' })
export class HumanizePipe implements PipeTransform {

  transform(value: string) {
    if ((typeof value) !== 'string') {
      return value;
    }
    value = value.replace(/([^A-Z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][^A-Z])/g, '$1 $2');
    if (value[0]) {
      value = value[0].toUpperCase() + value.slice(1);
    }
    return value;
  }
}
