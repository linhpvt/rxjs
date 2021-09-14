import { catchError, Observable, of } from 'rxjs';

export default () => {
  const o = new Observable((subscriber) => {
    setTimeout(() => {
      subscriber.error(new Error('Request timeout'));
    }, 3000);
  });

  o.pipe(catchError((err) => of(err.message))).subscribe({
    next: (val) => console.log(val),
    error: (err) => console.log(err),
  });
};
