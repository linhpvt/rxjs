import { interval, Observable, Subscription } from 'rxjs';

export default () => {
  const intervalHandler = (label: string) => (val: number) => {
    console.log(label, ' ', val);
  };
  const handlerFor1 = intervalHandler('1');
  const interval$ = interval(1000);
  interval$.subscribe({
    next: handlerFor1,
  });
  setTimeout(() => {
    interval$.subscribe({
      next: handlerFor1,
    });
  }, 10000);

  function ourOwnInterval(millis: number): Observable<number> {
    return new Observable((subscriber) => {
      let count = 1;

      const id = setInterval(() => {
        subscriber.next(count);
        count++;
      }, millis);

      // Teardown, clean-up function
      return () => {
        console.log('Run clean up for 2');
        clearInterval(id);
      };
    });
  }

  const handlerFor2 = intervalHandler('2');
  const ourOwnIntervalObservable = ourOwnInterval(2000);
  ourOwnIntervalObservable.subscribe({
    next: handlerFor2,
  });

  let subscription2: Subscription;
  setTimeout(() => {
    subscription2 = ourOwnIntervalObservable.subscribe({
      next: handlerFor2,
    });
  }, 10000);

  setTimeout(() => {
    subscription2.unsubscribe();
  }, 15000);
};
