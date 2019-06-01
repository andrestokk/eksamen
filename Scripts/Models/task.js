export class Task {
    id
    name
    description
    status
    deadline
    members

    constructor(name, description){
        this.name = name
        this.description = description
    }

    printName = function() {
         console.log(this.name)
    }
}
