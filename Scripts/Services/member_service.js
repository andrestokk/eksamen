import { Member } from "../Models/member.js";

export class MemberService {
    members

    constructor(){
        this.members = new Array()
    }

    addMember = (member) => this.members.push(member)
    
    deleteMember = function(member) {
        let index = this.members.find(m => m.id === member.id).index
        if(index != undefined){
            this.members.splice(index, 1)
        }
    }
    
    getByUsername = (username) => this.members.find(m => m.username == username)

    seedDebugData = function(){
        //DEBUG Seed
        this.members.push(new Member(1, 'jumam', 'Julie Mamelund'))
        this.members.push(new Member(2, 'thore', 'Thomas Øren'))
        this.members.push(new Member(3, 'ansto', 'André Stokkeland'))
        this.members.push(new Member(4, 'maeli', 'Mathias Myhre Eli'))
        this.members.push(new Member(5, 'elklu', 'Elise Klungtveit'))
    }

}