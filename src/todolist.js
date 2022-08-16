/* eslint-disable linebreak-style */
import Drag from '../icon/drag.png';

const completed = false;
let i = 0;
export default class ToDoList {
  constructor() {
    this.todolist = [];
    this.todolist = this.getList();
  }

  getList = () => {
    if (!this.checkList()) {
      return JSON.parse(localStorage.getItem('list'));
    }
    return this.todolist;
  }

  checkList = () => (localStorage.getItem('list') === null);

  updateList = () => {
    localStorage.setItem('list', JSON.stringify(this.todolist));
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  displayList = () => {
    i = 0;
    const list = document.querySelector('ul');
    Object.values(this.todolist).forEach((val) => {
      list.innerHTML += `<li class="list-item" draggable="true">
                            <span>
                              <input id='checker${i}' class='checker' type='checkbox'>
                              <input id="lists${i}" class="lists" type="text" value="${val.description}">
                            </span>
                            <img class="drag" draggable="false" id='drag${i}' src='${Drag}'>
                          </li>`;
      i += 1;
    });
  }

  addTask = (description, index) => {
    const task = {
      description,
      completed,
      index,
    };
    this.todolist.push(task);
    this.updateList();
  }

  deleteTask = (index) => {
    this.todolist.splice(index, 1);
    this.updateList();
  }

  updateTask = (list) => {
    localStorage.setItem('list', JSON.stringify(list));
  }
}
