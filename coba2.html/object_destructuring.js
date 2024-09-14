let obj = {a : 1, b : 2};

let {a, b} = obj;
console.log(a);
console.log(b);

let name = 'AL';
let age = 19;

let person = {
    name,
    age
};
console.log(name);
console.log(age);

let user = 'name'
let email = user+'@gmail.com'
let id = 1234

let orang = {
    [user]: 'jack',
    user_id: `${id}`,
    user_email: `${email}`
};

console.log(orang.name);
console.log(orang.user_id);
console.log(orang.user_email);