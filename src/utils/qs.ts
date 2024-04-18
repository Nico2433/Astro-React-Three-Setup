export const qs = <T extends HTMLElement>(selectors: string) =>
  document.querySelector<T>(selectors)!;

export const qsAll = <T extends HTMLElement>(selectors: string) =>
  document.querySelectorAll<T>(selectors);
