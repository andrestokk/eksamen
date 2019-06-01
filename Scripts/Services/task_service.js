import { Task } from '../Models/task.js'
import { Member } from '../Models/member.js'

export class TaskService {
    tasks

    constructor(){
        this.tasks = new Array()

        //DEBUG Seed
        let member = new Member(1, 'dummy', 'dummy')

        let task = new Task(1, 'Task 0', 'Ongoing task', member)
        task.setStatus('ongoing')
        this.tasks.push(task)

        this.tasks.push(new Task(2, 'Task 1', 'The first task', member))
        this.tasks.push(new Task(3, 'Task 2', 'The second task', member))
        this.tasks.push(new Task(4, 'Task 3', 'The last task', member))

    }

    addTask = (task) => this.tasks.push(task)

    deleteTask = function(task) {
        let index = this.tasks.find(t => t.id === task.id).index
        if(index != undefined) {
            this.tasks.splice(index, 1)
        }
    }
    
    count = () => this.tasks.length

    getTasksByStatus = function(status){
        return this.tasks.filter(t => t.status === status)
    }

    loadTasks = function() {
        throw 'Not yet implemented'
    }
    
    saveTasks = function() {
        throw 'Not yet implemented'
    }
}