import { Observable } from 'rxjs';
export default () => {
  /*
    The passing function of an Observable gets called once once we call the subscribe function of Observable object.
    Observable emit notification in both synchronous and asynchronous way
  */
  // New observable is created
  const observable$ = new Observable<string>((subscriber) => {
    console.log('Observable run');
    // sync.start
    subscriber.next('Alice');
    subscriber.next('Tom');
    // sync.end

    // async.start
    setTimeout(() => {
      subscriber.next('Peter');

      // complete operations, no more notification emitted
      subscriber.complete();
    }, 2000);
    // async.end

    // Teardown
    return () => {
      console.log('Cleanup or cancel request !!!');
    };
  });
  console.log('Before subsribe');
  const handler = (value: string) => console.log(value);
  observable$.subscribe((value) => console.log(value));
  observable$.subscribe(handler);
  console.log('After subscribe');
};
