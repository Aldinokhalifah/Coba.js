let arr = [];

for(let i =1; i < 11;i++) {
    arr.push(i);
}

for( let i of arr) {
    console.log(i);
}

let obj = {a : 1, b : 2, c : 3, d : 4};
for(let i in obj) {
    console.log(i);
}

