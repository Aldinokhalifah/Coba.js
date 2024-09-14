const user = {
    username: 'alice',
    email: 'alice@example.com'
};

let { username, email, role: User = 'guest' } = user;
console.log(username); // Output: alice
console.log(email);   // Output: alice@example.com
console.log(User);    // Output: guest
