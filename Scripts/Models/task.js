export class Task {
    id
    name
    description
    status
    deadline
    members

    constructor(name, description, member){
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

    printName = function() {
         console.log(this.name)
    }
}
