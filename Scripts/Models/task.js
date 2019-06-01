export class Task {
    id
    name
    description
    status
    deadline
    members

    constructor(id, name, description, member){
        this.id = id
        this.name = name
        this.description = description
        this.members = new Array(member)
        this.status = 'todo'
    }

    setStatus = function(status){
        switch(status){
            case 'todo':
            case 'ongoing':
            case 'done':
                // Fall-through intended
                // Valid value. Continue.
                break
            default:
                throw 'Use todo, ongoing or done for Task status'
        }
        this.status = status
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
