import { Observable } from 'rxjs';

export default () => {
  const observable$ = new Observable<number>((subscriber) => {
    console.log('New subscriber arrives');
    let counter = 1;
    const intervalId = setInterval(() => {
      subscriber.next(counter);
      counter++;
    }, 1000);

    setTimeout(() => {
      // complete
      subscriber.complete();

      // error
      subscriber.error(new Error('Failure'));
    }, 3000);

    /*
      Teardown:
      1. will run for each subscriber when it calls .unsubscribe function
      2. error: run for all subscribers
      3. complete: run for all subscribers
    */
    return () => {
      console.log('Teardown starts ', intervalId);
      clearInterval(intervalId);
    };
  });

  const sub1 = observable$.subscribe({
    next: (val) => console.log(val),
    complete: () => console.log('Observable is completed'),
    error: (err) => console.log(err),
  });

  const sub2 = observable$.subscribe({
    next: (val) => console.log(val),
    complete: () => console.log('Observable is completed'),
    error: (err) => console.log(err),
  });

  setTimeout(() => {
    console.log('Sub 1 unsubscribe');
    sub1.unsubscribe();
  }, 5000);

  setTimeout(() => {
    console.log('Sub 2 unsubscribe');
    sub2.unsubscribe();
  }, 20000);
};
