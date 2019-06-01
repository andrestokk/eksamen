import {Task} from './Models/task.js'
import {TaskService} from './Services/task_service.js'
import {MemberService} from './Services/member_service.js'

let memberService = new MemberService()
let member = memberService.getByUsername('jfk')
if(member === undefined) {
    console.log('Fant ikke medlem!')
}
else {
    let task1 = new Task('Clean bathroom', 'Clean the bathroom with soap', member)
    let task2 = new Task('Walk the dog', 'Take Spot for a walk around the block', member)

    let taskService = new TaskService()
    taskService.addTask(task1)
    taskService.addTask(task2)

    console.log(taskService.count())
    console.log(task1.members[0].name)
}
