import { fromEvent } from 'rxjs';
import { debounceTime, take, tap } from 'rxjs/operators';

const slider = document.getElementById('slider');

export default () => {
  fromEvent<InputEvent>(slider, 'input')
    .pipe(
      // after 1 second since the last action time.
      debounceTime(1000),
      tap((val) => console.log('Tap ', val)),
    )
    .subscribe({
      // @ts-ignore
      next: (val) => console.log(val.target.value),
    });
};
