export default class DragAndDrop {
  constructor(idx) {
    this.index = idx;
  }

  dragStart = () => {
    document.querySelectorAll('.list-item')[this.index].addEventListener('dragstart', () => {
      // console.log(document.querySelectorAll('.list-item')
      // [this.index].firstElementChild.firstElementChild.nextElementSibling);
      document.querySelectorAll('.list-item')[this.index].firstElementChild.firstElementChild.nextElementSibling.value = '';
    });
  }

  dragOver = () => {

  }

  drop = () => {

  }
}
