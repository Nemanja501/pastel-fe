const aDayInMs = 24 * 60 * 60 * 1000; //24hours * 60minutes * 60seconds * 1000milliseconds to get a day in milliseconds
const anHourInMs = 60 * 60 * 1000; //60mins * 60seconds * 1000ms
const aMinInMs = 60 * 1000; //60seconds * 1000ms

export function calculateDiffBetweenDates(date: Date) : string {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - date.getTime();
    if(Math.round(timeDiff / aDayInMs) > 0) {
        return Math.round(timeDiff / aDayInMs) + 'd';
    } else if( Math.round(timeDiff / anHourInMs) > 0) {
        return  Math.round(timeDiff / anHourInMs) + 'h';
    } else if(Math.round(timeDiff / aMinInMs) > 0) {
        return  Math.round(timeDiff / aMinInMs) + 'min';
    } else {
        return  Math.abs(Math.round(timeDiff / 1000)) + 's';
    }
}