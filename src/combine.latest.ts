import { combineLatest, fromEvent } from 'rxjs';

export default () => {
  const temperature = document.getElementById('temperature');
  const conversion = document.getElementById('conversion');
  const result = document.getElementById('result');

  const temperature$ = fromEvent(temperature, 'input');
  const conversion$ = fromEvent(conversion, 'input');

  combineLatest([temperature$, conversion$]).subscribe((results) => {
    const [
      // @ts-ignore
      { target: { value: temp = '' } = {} },
      // @ts-ignore
      { target: { value: convert = '' } = {} },
    ] = results;
    result.innerText = `${temp}  ${convert.toUpperCase()}`;
  });
};
