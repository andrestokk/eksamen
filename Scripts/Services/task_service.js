export class TaskService {
    tasks

    constructor(){
        this.tasks = new Array()
    }

    addTask = (task) => this.tasks.push(task)
    count = () => this.tasks.length

    getTasksByStatus = function(status){
        
    }
}