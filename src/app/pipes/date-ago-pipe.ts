import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgo',
  pure: false,
})
export class DateAgoPipe implements PipeTransform {
  transform(value: any): unknown {
    const date = value instanceof Date ? value : new Date(value);
    const formatter = new Intl.RelativeTimeFormat('en');
    const ranges = [
      ['year', 3600 * 24 * 365],
      ['month', 3600 * 24 * 30],
      ['week', 3600 * 24 * 7],
      ['day', 3600 * 24],
      ['hour', 3600],
      ['minute', 60],
      ['second', 1],
    ] as const;
    const secondsElapsed = (date.getTime() - (Date.now() + 1000)) / 1000;
    for (const [rangeType, rangeVal] of ranges) {
      if (rangeVal < Math.abs(secondsElapsed)) {
        const delta = secondsElapsed / rangeVal;
        const time = Math.abs(Math.round(delta));
        // return formatter.format(Math.round(delta), rangeType);
        return time + ' ' + rangeType + (time == 1 ? ' ago' : 's ago');
      }
    }
    return 'Invalid Date';
  }
}
