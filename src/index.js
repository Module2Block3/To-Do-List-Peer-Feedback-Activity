/* eslint-disable linebreak-style */
import './style.css';
import ToDoList from './todolist.js';
import taskStatus from './taskstatus.js';
import DragAndDrop from './draganddrop.js';
import Del from '../icon/delete.png';
import Drag from '../icon/drag.png';
import Syn from '../icon/sync.png';
import Ret from '../icon/return.png';

document.querySelector('ul').addEventListener('keypress', (pressed) => {
  if (pressed.target.classList.contains('InputText')) {
    if (pressed.key === 'Enter' && pressed.target.value !== '') {
      const task = new ToDoList();
      task.addTask(pressed.target.value, task.todolist.length + 1);
    }
  }
});

let blurred = true;
const tdlGlobal = new ToDoList();

window.addEventListener('DOMContentLoaded', () => {
  const CheckboxStatus = taskStatus;
  const statusObj = new CheckboxStatus();
  statusObj.update();
  statusObj.clear();

  window.onload = () => {
    document.getElementById('sync').src = Syn;
    document.getElementById('enter').src = Ret;
    tdlGlobal.displayList();
    Object.values(tdlGlobal.todolist).forEach((val, i) => {
      if (val.completed) {
        document.getElementById(`checker${i}`).checked = true;
        document.getElementById(`checker${i}`).nextElementSibling.style.textDecoration = 'line-through';
        document.getElementById(`checker${i}`).nextElementSibling.style.color = '#aaa';
      }
    });
  };
  document.querySelector('div').addEventListener('click', (pressed) => {
    if (pressed.target.classList.contains('lists')) {
      pressed.target.parentElement.parentElement.style.background = '#eeedb9';
      pressed.target.style.background = '#eeedb9';
      pressed.target.parentElement.nextElementSibling.src = Del;
      blurred = false;
      pressed.target.addEventListener('blur', () => {
        setTimeout(() => {
          blurred = true;
          pressed.target.parentElement.parentElement.style.background = 'white';
          pressed.target.style.background = 'white';
          pressed.target.parentElement.nextElementSibling.src = Drag;
        }, 500);
      });
    } else if (pressed.target.classList.contains('drag')) {
      const taskIcon = document.querySelectorAll('.drag');
      let idx = 0;
      // eslint-disable-next-line no-restricted-syntax
      for (const task of taskIcon) {
        if (task.id === pressed.target.id) {
          if (!blurred) {
            const taskToDelete = new ToDoList();
            taskToDelete.deleteTask(idx);
          } else {
            // drag item
            const DragDrop = DragAndDrop;
            const dragObj = new DragDrop(idx);
            dragObj.dragStart();
            dragObj.dragOver();
            dragObj.drop();
          }
          blurred = true;
        }
        idx += 1;
      }
    } else if (pressed.target.classList.contains('sync')) {
      localStorage.clear();
      const tdl = new ToDoList();
      tdl.todolist = [];
      tdl.updateList();
    } else if (pressed.target.classList.contains('enter')) {
      if (pressed.target.previousElementSibling.value !== '') {
        const task = new ToDoList();
        task.addTask(pressed.target.previousElementSibling.value, task.todolist.length + 1);
      }
    }
  });
  document.querySelector('div').addEventListener('change', (changedTxt) => {
    if (changedTxt.target.classList.contains('lists')) {
      const taskDesc = document.querySelectorAll('.lists');
      let idx = 0;
      // eslint-disable-next-line no-restricted-syntax
      for (const desc of taskDesc) {
        if (desc.id === changedTxt.target.id) {
          break;
        }
        idx += 1;
      }
      Object.values(tdlGlobal.todolist).forEach((val, index) => {
        if (idx === index) {
          val.description = changedTxt.target.value;
        }
      });
      tdlGlobal.updateTask(tdlGlobal.todolist);
    }
  });
});
