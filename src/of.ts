import { Observable, of } from 'rxjs';

export default () => {
  // orginial of function to create an Observable
  const of$ = of('alice', 'peter', 1);
  of$.subscribe({
    next: (val) => console.log(val),
    complete: () => console.log('Completed!'),
  });

  // our own of function.
  const ourOf$ = (...args: any[]): Observable<any> => {
    return new Observable<any>((subscriber) => {
      args.forEach((val: any) => subscriber.next(val));
      subscriber.complete();
    });
  };

  ourOf$(1, 2, 3, 4).subscribe({
    next: (val) => console.log(val),
    complete: () => console.log('Our own of completed'),
  });
};
