import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

export default () => {
  function observableFactory(delay: number, data: any[]) {
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
  }

  const o = observableFactory(7000, ['A', 'B', 'C']);
  o.pipe(map((value) => `${value} === ${value}`)).subscribe({
    next: (val) => console.log('Filter ', val),
  });

  o.subscribe((val) => console.log('All ', val));
};
