import { Task } from '../Models/task.js'
import { Member } from '../Models/member.js'

export class TaskService {
    tasks

    constructor(){
        this.tasks = new Array()

        //DEBUG Seed
        let member = new Member(1, 'dummy', 'dummy')

        let task = new Task('Task 0', 'Ongoing task', member)
        task.setStatus('ongoing')
        this.tasks.push(task)

        this.tasks.push(new Task('Task 1', 'The first task', member))
        this.tasks.push(new Task('Task 2', 'The second task', member))
        this.tasks.push(new Task('Task 3', 'The last task', member))

    }

    addTask = (task) => this.tasks.push(task)
    count = () => this.tasks.length

    getTasksByStatus = function(status){
        return this.tasks.filter(t => t.status === status)
    }
}