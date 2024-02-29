export class TableSelection {
  constructor() {
    this.group = [];
  }
  // $el: Dom
  select($el) {
    this.group.push($el);
    $el.addClass('selected');
  }

  selectGroup() {}
}
