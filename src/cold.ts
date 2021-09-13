import { ajax } from 'rxjs/ajax';

export default () => {
  // We create an Observable
  const ajax$ = ajax<any>({
    url: 'https://random-data-api.com/api/name/random_name',
  });

  /*
    1. We create a new Objservable
    2. We create three subscriptions to it. three of them run dependently.
  */
  const responseHandler = (resp: any) => {
    const { response: { first_name = 'No value' } = {} } = resp;
    console.log(first_name);
  };
  // 1. first call
  ajax$.subscribe({
    next: responseHandler,
  });

  // 2. second call
  ajax$.subscribe({
    next: responseHandler,
  });

  // 3. third call
  ajax$.subscribe({
    next: responseHandler,
  });
};
