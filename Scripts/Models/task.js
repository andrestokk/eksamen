import { AppManager } from '../Services/app_manager.js'

export class Task {
    id
    name
    description
    status
    deadline
    members

    constructor(){
        this.members = new Array()
    }

    setStatus = function (newStatus){
        switch(newStatus){
            case 'todo':
            case 'ongoing':
            case 'done':
                // Fall-through intended
                // Valid value. Continue.
                break
            default:
                throw 'Use todo, ongoing or done for Task status'
        }
        this.status = newStatus
    }

    addMember = (member) => this.members.push(member)

    removeMember = function(member) {
        let index = this.members.find(m => m.id === member.id).index
        if(index != undefined){
            this.members.splice(index, 1)
        }
    }

    printName = function() {
         console.log(this.name)
    }
}
