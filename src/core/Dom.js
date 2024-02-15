export class Dom {
  constructor() {}

  static create(tagName, classes = '') {
    const $el = document.createElement(tagName);
    if (classes) {
      $el.classList.add(classes);
    }
    return $el;
  }
}
