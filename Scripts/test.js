import {Task} from './Models/task.js'
import { TaskService } from './Services/task_service.js';

let task1 = new Task('Clean bathroom', 'Clean the bathroom with soap')

let task2 = new Task('Walk the dog', 'Take Spot for a walk around the block')

let taskService = new TaskService()
taskService.addTask(task1)
taskService.addTask(task2)

console.log(taskService.count())
console.log(task1.name)


