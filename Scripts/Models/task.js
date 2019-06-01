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
    }



    printName = function() {
         console.log(this.name)
    }
}
