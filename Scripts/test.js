import {Task} from './Models/task.js'
import {TaskService} from './Services/task_service.js'
import {MemberService} from './Services/member_service.js'
import { Member } from './Models/member.js';
import { AppManager } from './Services/app_manager.js';



updateATaskFromAppManager()
//testAppManager()
//testLocalStorage()
//testSetTaskStatus()
//testMembersAndTasks()

function updateATaskFromAppManager(){

    // Initiate AppManager and LoadData (as e.g. Tasks.js for Tasks.html does)
    let app = new AppManager()
    app.loadData()
    
    // Get task after clicking edit
    let task = app.taskService.getTaskById(1)
    
    // Get data to display in edit form
    console.log(task.id)
    console.log(task.name)
    console.log(task.description)
    //etc...

    // Update task with new data from form
    task.description = 'Bedre beskrivelse'
    
    // Save updated task
    app.saveData()
}


function testAppManager() {
    let appManager = new AppManager()

    //appManager.saveData()
    // appManager.memberService.seedDebugData()
    // appManager.saveData()
    appManager.loadData()
    console.log(appManager.memberService.members)
    console.log(appManager.taskService.tasks)
}


function testLocalStorage(){
    let taskService = new TaskService()
    localStorage.setItem('tasks', JSON.stringify(taskService.tasks))
    //console.log(JSON.stringify(taskService.tasks))
}


function testSetTaskStatus(){

    let task = new Task('Task 1', 'This is the first task', null)
    task.setStatus('todo')
    console.log(task.status)
}


function testMembersAndTasks(){

    let member1 = new Member(10, 'jumam', 'julie Heisann')

    let memberService = new MemberService()
    memberService.addMember(member1)

    let member = memberService.getByUsername('jumam')

    if(member === undefined) {
        console.log('Fant ikke medlem!')
    }
    else {
        let task1 = new Task('Clean bathroom', 'Clean the bathroom with soap', member1)
        let task2 = new Task('Walk the dog', 'Take Spot for a walk around the block', member)

        let taskService = new TaskService()
        taskService.addTask(task1)
        taskService.addTask(task2)

        console.log(taskService.count())
        console.log(task1.members[0].name)
    }

}