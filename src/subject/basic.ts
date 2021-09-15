import { filter, fromEvent, map, Subject } from 'rxjs';

export default () => {
  const input = document.getElementById('input');
  const emit = document.getElementById('emit');
  const subscribe = document.getElementById('subscribe');
  let subsribers = 0;
  // create a new Subject
  const subject$ = new Subject<string>();

  /*
    Start observe events from buttons
  */
  // create an Observable that watches the Hot Source to fire the events
  fromEvent(emit, 'click')
    // @ts-ignore
    .pipe(map(() => input.value))
    .subscribe(
      // when user click emit button, we multicast the input value
      // @ts-ignore
      (v) => subject$.next(v),
    );

  // create an Observable to subscribe button
  fromEvent(subscribe, 'click').subscribe({
    next: () => {
      // Subscribe to the subject
      subsribers++;
      console.log('Number of subscibers, ', subsribers);
      const subscription = subject$.subscribe({
        next: (val) => console.log(val),
        complete: () => console.log('Completed'),
        error: (err) => console.log(err),
      });

      // After 10 seconds, unsubscribe
      setTimeout(() => {
        subscription.unsubscribe();
      }, 10000);
    },
  });
};
