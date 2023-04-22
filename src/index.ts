import { v4 as uuidV4 } from 'uuid';

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.getElementById('new-task-form') as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>('#new-task-title')!;
const tasks : Task[] = loadTasks();
tasks.forEach(addItem);

interface Task {
  id: string,
  title:string,
  completed:boolean,
  createdAt:Date
}

form?.addEventListener('submit', e => {
  e.preventDefault();

  if(input?.value === "" || input?.value === null) return;

  const newTask : Task = {
    id: uuidV4(),
    title: input.value,
    completed:false,
    createdAt: new Date()
  }
  tasks.push(newTask);
  saveItem();

  addItem(newTask);
  input.value = "";
})

function addItem (task : Task) {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveItem();
  })
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

function saveItem() {
  localStorage.setItem("Tasks",JSON.stringify(tasks))
}

function loadTasks():Task[] {
  const taskJson = localStorage.getItem("Tasks");
  if(taskJson == null) return [];
  return JSON.parse(taskJson);
}