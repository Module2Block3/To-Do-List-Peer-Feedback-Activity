/* eslint-disable linebreak-style */
import ToDoList from './todolist.js';

const tdlGlobal = new ToDoList();

export default class taskStatus {
  constructor() {
    this.comp = false;
  }

  update = () => {
    document.querySelector('div').addEventListener('change', (pressed) => {
      if (pressed.target.classList.contains('checker')) {
        this.comp = false;
        if (pressed.target.checked) {
          this.comp = true;
          pressed.target.nextElementSibling.style.textDecoration = 'line-through';
          pressed.target.nextElementSibling.style.color = '#aaa';
        } else {
          pressed.target.nextElementSibling.style.textDecoration = 'none';
          pressed.target.nextElementSibling.style.color = '#000';
        }
        const taskChecker = document.querySelectorAll('.checker');
        let idx = 0;
        // eslint-disable-next-line no-restricted-syntax
        for (const checker of taskChecker) {
          if (checker.id === pressed.target.id) {
            break;
          }
          idx += 1;
        }
        Object.values(tdlGlobal.todolist).forEach((val, index) => {
          if (idx === index) {
            val.completed = this.comp;
          }
        });
        tdlGlobal.updateTask(tdlGlobal.todolist);
      }
    });
  }

  clear = () => {
    this.comp = false;
    document.querySelector('div').addEventListener('click', (pressed) => {
      if (pressed.target.classList.contains('clr')) {
        const tasks = document.querySelectorAll('.checker');
        const tasksArr = Array.prototype.slice.call(tasks);
        const checkedTasks = tasksArr.filter((task) => task.checked === true);
        Object.values(checkedTasks).forEach((_val, i) => {
          const list = new ToDoList();
          list.deleteTask(Number(checkedTasks[i].id.charAt(7)) - i);
        });
      }
    });
  }
}
