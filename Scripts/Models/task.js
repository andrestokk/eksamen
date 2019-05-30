export class Task {
    id
    name
    description
    status
    deadline
    members

    printName = function() {
         console.log(this.name)
    }
}
