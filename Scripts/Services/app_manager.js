import {MemberService} from './member_service.js'
import {TaskService} from './task_service.js'
import {Member} from '../Models/member.js';
import {Task} from '../Models/task.js';

export class AppManager {
    version = 1
    memberService
    taskService

    constructor() {
        this.memberService = new MemberService()
        this.taskService = new TaskService()
    }

    loadData = function() {
        // Load and parse app data
        let data = JSON.parse(localStorage.getItem('VaneData'))
        
        if(data == null){
            return
        }

        // Check data version. (For now, just check equality. Could apply any conversions here).
        if(data.version != this.version){
            throw "Version of data does not match app version"
        }

        // Reconstruct objects from data
        for(let savedMember of data.memberService.members){
            let member = new Member()
            member.id = savedMember.id
            member.username = savedMember.username
            member.name = savedMember.name
            this.memberService.addMember(member)
        }
        for(let savedTask of data.taskService.tasks){
            let task = new Task()
            task.id = savedTask.id
            task.name = savedTask.name
            task.description = savedTask.description
            task.status = savedTask.status
            task.deadline = savedTask.deadline
            for(let savedMember of savedTask.members){
                let member = new Member()
                member.id = savedMember.id
                member.username = savedMember.username
                member.name = savedMember.name
                task.members.push(member)
            }
            this.taskService.tasks.push(task)
        }

    }
    
    createNewTask = function(name, description, member){
        let task = new Task()
        task.id = this.taskService.getNextTaskId()
        task.name = name
        task.description = description
        task.members = new Array(member)
        task.status = 'todo'
        this.taskService.tasks.push(task)
        return task
    }

    saveData = function() {
        //For this assigment, we chose to store all data in this object for simplicity.
        localStorage.setItem('VaneData', JSON.stringify(this))
    }

}