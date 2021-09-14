import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

const observableFactory = (delay: number, data: any[]) => {
  const len = data.length - 1;
  return new Observable((subsriber) => {
    const intervalId = setInterval(() => {
      const random = Math.ceil(Math.random() * len);
      const dt = data[random];
      console.log('Random ', dt);
      subsriber.next(dt);
    }, delay);
    // Teardown
    return () => {
      clearInterval(intervalId);
    };
  });
};
export default () => {
  const o = observableFactory(7000, ['A', 'B', 'C']);
  o.pipe(
    // you can perform the side effect here
    tap((val) => console.log('Tap 1', val)),
    // multiple operators in order
    filter((val) => val === 'C'),
    map((value) => `${value} === ${value}`),
    // configured object like subscribe function
    tap({
      next: (val) => console.log('Tap 2 object configured', val),
      error: (err) => console.log(err),
      complete: () => console.log('Tap 2 configured object and completed!'),
    }),
  ).subscribe();

  // o.subscribe((val) => console.log('All ', val));
};
