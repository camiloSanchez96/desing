import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { CONSTANTS } from './constants/constants';
@Pipe({
    name: 'moment',
})
export class MomentPipe implements PipeTransform {
    transform(value: Date | moment.Moment, format: string = '', isRelative: boolean = false, hasRelativeSufix: boolean = false): string {
        switch (format) {
            case 'date': format = CONSTANTS.dateFormat; break;
            case 'time': format = CONSTANTS.hourFormat; break;
            case '': format = CONSTANTS.datetimeFormat; break;
        }
        if (isRelative) {
            return moment(value).fromNow(hasRelativeSufix);
        } else {
            return moment(value).format(format);
        }
    }
}
