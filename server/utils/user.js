[{
    id: '#12poiahasjhdvg',
    name: 'Dorothy',
    room: 'The Office Fans'
}]

//addUser(id, name, room)
//removeUser(id)
//getUser(id)
//getUserList(room)


//create class:
// class Person {
//     constructor (name, age){
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription(){
//         return `${this.name} is ${this.age} year(s) old`;
//     }
// }

// var me = new Person('Dorothy',23);
// var description = me.getUserDescription();
// console.log(description);

class Users{
    constructor () {
        this.users = [];
    }
    addUser(id, name, room){
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser (id) {
        //return user that was removed
        var user = this.getUser(id);

        if(user) {
            this.users = this.users.filter((user)=>user.id !== id);
        }
        return user;
    }
    getUser (id) {
        return this.users.filter((user)=> user.id === id)[0]
    }
    getUserList(room){
        var users = this.users.filter((user)=>{
            return user.room === room;
        });
        var namesArray = users.map((user)=>{
            return user.name;
        });
        return namesArray;
    }
} 

module.exports={Users}; 