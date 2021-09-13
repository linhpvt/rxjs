import { Observable } from 'rxjs';
export default () => {
  // The logic code of an observable gets run once we call the subscribe method.
  const observable$ = new Observable<string>((subscriber) => {
    console.log('Observable started !!!');
    const arr = ['Alex', 'Jame', 'Alice'];
    subscriber.next('Alex');
    setInterval(() => {
      const index = Math.floor(Math.random() * 1000) % 3;
      subscriber.next(arr[index]);
    }, 1500);
  });

  // First formular of observer
  const observer = {
    next: (value: string) => console.log(value),
  };

  console.log('First subscription 01');
  const subscription = observable$.subscribe(observer);

  setTimeout(() => {
    console.log('New subscriber arrives !!!');
    observable$.subscribe((value) => console.log('Other subscribler', value));
  });

  setTimeout(() => {
    console.log('unsubscribe !!!');
    // we are no longer interested in data.
    subscription.unsubscribe();
  }, 3000);
};
