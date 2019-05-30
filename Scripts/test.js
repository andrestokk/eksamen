import {Task} from './Models/task.js'
import { TaskService } from './Services/task_service.js';

let task1 = new Task()
task1.name = 'Oppgave A'

let task2 = new Task()
task2.name = 'Oppgave B'

let taskService = new TaskService()
taskService.addTask(task1)
taskService.addTask(task2)

console.log(taskService.count())

