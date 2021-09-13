import { forkJoin, lastValueFrom, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';

interface RespType {
  first_name?: string;
  model?: string;
  dish?: string;
}
export default () => {
  const name$ = ajax<RespType>(
    'https://random-data-api.com/api/name/random_name',
  );
  const device$ = ajax<RespType>(
    'https://random-data-api.com/api/device/random_device',
  );
  const food$ = ajax<RespType>(
    'https://random-data-api.com/api/food/random_food',
  );

  // OUR OWN forkJoin
  function ourForkJoin(arr: Observable<any>[]): Observable<any> {
    return new Observable((subscriber) => {
      // hold response data in order.
      const arrData = arr.map(() => null);
      arr.forEach((ob: Observable<any>, index: number) => {
        ob.subscribe({
          next: (value) => {
            arrData[index] = value;
            const notFullFilled = arrData.filter((item) => item === null);
            // all ajax responded.
            if (notFullFilled.length === 0) {
              subscriber.next(arrData);
              subscriber.complete();
            }
          },
          error: (err) => {
            // one of observables error.
            subscriber.error();
          },
        });
      });
    });
  }

  ourForkJoin([name$, device$, food$]).subscribe({
    next: (values) => {
      const [
        { response: { first_name = '' } = {} },
        { response: { model = '' } = {} },
        { response: { dish = '' } = {} },
      ] = values;
      console.log(`${first_name}, ${model}, ${dish}`);
    },
    error: (err) => console.log(err),
  });

  // RXJS forkJoin
  forkJoin([name$, device$, food$]).subscribe({
    next: (values) => {
      const [
        { response: { first_name = '' } = {} },
        { response: { model = '' } = {} },
        { response: { dish = '' } = {} },
      ] = values;
      console.log(`${first_name}, ${model}, ${dish}`);
    },
    error: (err) => console.log(err),
  });
};
