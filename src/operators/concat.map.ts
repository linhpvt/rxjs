import {
  catchError,
  concatMap,
  EMPTY,
  fromEvent,
  map,
  Observable,
  of,
  tap,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

const search = document.getElementById('search');
const btn = document.getElementById('btnSearch');

export default () => {
  fromEvent(btn, 'click')
    .pipe(
      concatMap((e) => {
        // @ts-ignore
        const val = search.value;
        return ajax(
          `https://random-data-api.com/api/${val}/random_${val}`,
        ).pipe(catchError((err) => EMPTY));
      }),
      // map<any, {}>((resp) => `Response Id: ${resp.response.id}`),
    )
    .subscribe({
      next: (resp) => console.log(resp),
    });

  // const o = new Observable((subsriber) => {
  //   setInterval(() => {
  //     subsriber.next(Math.floor(Math.random() * 100));
  //   }, 10000);
  // });

  // o.pipe(
  //   tap((v) => console.log(v)),
  //   //
  //   concatMap((v) => of(`1 - ${v}`)),
  //   map((v) => v.split('-')[1]),
  // ).subscribe({
  //   next: (v) => console.log(v),
  // });
};
