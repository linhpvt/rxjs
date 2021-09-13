import { Observable, Subscription } from 'rxjs';

export default () => {
  // the source is outside of the body of the observable
  const btn = document.getElementById('btnclick');
  const hotObservable$ = new Observable<MouseEvent>((subscriber) => {
    console.log('Observable running');
    const fn = (event: MouseEvent) => {
      subscriber.next(event);
    };
    // provide a connect to the source outside the observable
    btn.addEventListener('click', fn);

    // Teardown function for cleaning-up or cancelation
    return () => {
      btn.removeEventListener('click', fn);
    };
  });

  hotObservable$.subscribe((event) =>
    console.log('First', event.type, event.x, event.y),
  );
  let sSubscription: Subscription;
  setTimeout(() => {
    sSubscription = hotObservable$.subscribe((event) =>
      console.log('Second', event.type, event.x, event.y),
    );
  }, 4000);

  setTimeout(() => {
    sSubscription.unsubscribe();
  }, 10000);
};
