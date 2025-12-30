let users = [];

const addUser = (newUser) => {
    if(!newUser.name || newUser.name.trim() === "") {
        console.error("Nama tidak boleh kosong");
        return;
    }

    if(typeof newUser.age !== "number" || newUser.age < 1) {
        console.error("Umur tidak boleh kurang dari 1");
        return;
    }

    users.push(newUser);
    console.log(`User ${newUser.name} berhasil ditambahkan`);
};

const getUsers = () => {
    if (users.length === 0) {
        console.log("Tidak ada user");
        return;
    }

    users.forEach((u) =>
        console.log(`ID: ${u.id} - Name: ${u.name} - Age: ${u.age}`)
    );
};

const updateUser = (id, newData) => {
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
        console.log(`User dengan id ${id} tidak ditemukan`);
        return;
    }

    users[index] = { ...users[index], ...newData };

    console.log(`User dengan id ${id} berhasil diperbarui`);
};

const deleteUser = (id) => {
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
        console.log(`User dengan id ${id} tidak ditemukan`);
        return;
    }

    users.splice(index, 1);

    console.log(`User dengan id ${id} berhasil dihapus`);
};


// Testing
const newUser  = { id: 1, name: "AL", age: 21 };
const newUser2 = { id: 2, name: "Akap", age: 11 };
const newUser3 = { id: 3, name: "Amel", age: 20 };
const newUser4 = { id: 3, name: "Ajam", age: 11 };

addUser(newUser);
addUser(newUser2);
addUser(newUser3);

getUsers();

updateUser(3, newUser4);
getUsers();

deleteUser(3);
getUsers();
