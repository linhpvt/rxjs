import { BehaviorSubject, fromEvent, withLatestFrom } from 'rxjs';

export default () => {
  const span = document.getElementById('status');
  const btnLogin = document.getElementById('login');
  const btnLogout = document.getElementById('logout');
  const btnPrintState = document.getElementById('printstate');
  const cacheKey = 'status';
  /*
    HELPERS
  */
  const setStatus = (val: boolean) => {
    sessionStorage.setItem(cacheKey, `${val}`);
  };
  const getStatus = () => {
    const val = sessionStorage.getItem(cacheKey) || '';
    return val === 'true' ? true : false;
  };

  /*
  INITIALIZE A SUBJECT WITH INITIAL STATE
*/
  const loginSubject$ = new BehaviorSubject<boolean>(getStatus());

  /*
  START A NEW OBSERVABLE FOR LOGIN
*/
  fromEvent(btnLogin, 'click').subscribe({
    next: () => loginSubject$.next(true),
  });

  /*
  START A NEW OBSERVABLE FOR LOGOUT
*/
  fromEvent(btnLogout, 'click').subscribe({
    next: () => loginSubject$.next(false),
  });

  /*
  START A NEW OBSERVABLE FOR PRINTING CURRENT STATE
*/
  fromEvent(btnPrintState, 'click')
    .pipe(withLatestFrom(loginSubject$))
    .subscribe({
      next: ([e, val]) => console.log(val),
    });

  /*
  SUBSCRIBE TO THE BEHAVIOR SUBJECT
*/
  loginSubject$.subscribe({
    next: (val) => {
      const isLogged = val;
      // status
      span.innerHTML = isLogged ? '<b>LOGGED IN</b>' : '<b>NOT LOGGED IN</b>';

      // login button
      btnLogin.style.display = isLogged ? 'none' : 'block';

      // logout button
      btnLogout.style.display = isLogged ? 'block' : 'none';

      setStatus(val);
    },
  });
  loginSubject$.subscribe({
    next: (val) => console.log('Another subscriber, ', val),
  });
};
