export interface Clock {
  now(): Date;
}
export class SystemClock implements Clock {
  now(): Date {
    return new Date();
  }
}
export class OffsetClock implements Clock {
  constructor(private readonly offsetDays: number) {}
  now(): Date {
    return new Date(Date.now() + this.offsetDays * 86_400_000);
  }
}
export class FixedClock implements Clock {
  constructor(private readonly date: Date) {}
  now(): Date {
    return new Date(this.date);
  }
}

export const hoursBetween = (from: string, to: Date) =>
  Math.max(0, (to.getTime() - new Date(from).getTime()) / 3_600_000);
