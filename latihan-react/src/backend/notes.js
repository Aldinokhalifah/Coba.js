let data = [];

const getAll = () => {
    if (data.length === 0) {
        console.log('Note kosong');
    } else {
        data.map((i) => console.log(`No: ${i.id} - ${i.text}`));
    }
}

const addData = (newData) => {
    if (!newData.text || newData.text.trim() === "") {
        console.log("Text tidak boleh kosong");
        return;
    }
    data.push(newData);
    console.log(`Berhasil menambahkan data: ${newData.text}`);
}

const deleteData = (id) => {
    const index = data.findIndex((i) => i.id === id);

    if (index === -1) {
        console.log(`ID ${id} tidak ditemukan`);
        return;
    }

    data.splice(index, 1);
    console.log(`Berhasil menghapus data id: ${id}`);
}

const newData = {
    id: 1,
    text: 'Belajar Backend'
};
const newData2 = {
    id: 2,
    text: 'Belajar Frontend'
};
const newData3 = {
    id: 3,
    text: 'Belajar Database'
};

addData(newData);
addData(newData2);
addData(newData3);
getAll();
deleteData(3);
getAll();
