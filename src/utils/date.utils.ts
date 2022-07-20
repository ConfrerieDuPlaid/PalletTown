export class DateUtils {
    static now(): Date {
        return new Date();
    }

    static getSecondsDifferenceBetweenTwoDates(d1: Date, d2: Date): number {
        const milliseconds: number = d1.getTime() - d2.getTime();
        return Math.abs(milliseconds) / 1_000;
    }
}
