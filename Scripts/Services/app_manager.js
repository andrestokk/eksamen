import {MemberService} from './member_service.js'
import {TaskService} from './task_service.js'

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

        // Update object data
        this.memberService.members = data.memberService.members
        this.taskService.tasks = data.taskService.tasks
    }
    
    saveData = function() {
        //For this assigment, we chose to store all data in this object for simplicity.
        localStorage.setItem('VaneData', JSON.stringify(this))
    }

}