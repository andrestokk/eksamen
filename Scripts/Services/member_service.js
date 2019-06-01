import { Member } from "../Models/member.js";

export class MemberService {
    members

    constructor(){
        this.members = new Array()

        //DEBUG Seed
        this.members.push(new Member(1, 'jumam', 'Julie Mamelund'))
        this.members.push(new Member(2, 'thore', 'Thomas Øren'))
        this.members.push(new Member(3, 'ansto', 'André Stokkeland'))
        this.members.push(new Member(4, 'maeli', 'Mathias Myhre Eli'))
        this.members.push(new Member(5, 'elklu', 'Elise Klungtveit'))

    }

    getByUsername = function(username){
        return this.members.find(m => m.username == username)
    }

}