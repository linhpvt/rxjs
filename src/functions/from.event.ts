import { fromEvent, Observable } from 'rxjs';
export default () => {
  const btn = document.getElementById('btnclick');

  // from rxjs lib
  fromEvent<MouseEvent>(btn, 'click').subscribe({
    next: (event) => console.log(event.type, event.x, event.y),
  });

  // our own function
  function ourOwnFromEvent<T>(
    target: HTMLElement,
    eventName: keyof HTMLElementEventMap,
  ): Observable<T> {
    return new Observable<any>((subscriber) => {
      // hanlder for event
      const eventHandler = function (event: any) {
        subscriber.next(event);
      };

      target.addEventListener(eventName, eventHandler);

      // Teardown or clean-up function
      return () => {
        console.log('Run clean up');
        target.removeEventListener(eventName, eventHandler);
      };
    });
  }
  const ourSubscription = ourOwnFromEvent<MouseEvent>(btn, 'click').subscribe({
    next: (val) => console.log(val.type, val.x, val.y),
  });
  setTimeout(() => {
    ourSubscription.unsubscribe();
  }, 5000);
};
