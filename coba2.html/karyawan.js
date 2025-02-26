const karyawan = [
    { name: "Karyawan 1", gol: "A", status: "NIKAH", lamaKerja: 6 },
    { name: "Karyawan 2", gol: "B", status: "BELUM", lamaKerja: 3 },
    { name: "Karyawan 3", gol: "C", status: "NIKAH", lamaKerja: 12 }
];

const gajiPokok = {
    A: 10000000,
    B: 8000000,
    C: 5000000
};

const tunjangan = {
    A: 2000000,
    B: 1500000,
    C: 1000000
};

for (const kar of karyawan) {
    let gaji = gajiPokok[kar.gol];
    let tunjanganKaryawan = (kar.status === "NIKAH") ? tunjangan[kar.gol] : 0;

    // Perhitungan bonus langsung dalam variabel
    let bonus = 0;
    if (kar.lamaKerja > 5 && kar.lamaKerja <= 10) {
        bonus = gaji * 0.1;
    } else if (kar.lamaKerja > 10) {
        bonus = gaji * 0.2;
    }

    let total = gaji + tunjanganKaryawan + bonus; 

    console.log(`Nama: ${kar.name}`);
    console.log(`Golongan: ${kar.gol}`);
    console.log(`Status: ${kar.status}`);
    console.log(`Lama Kerja: ${kar.lamaKerja} tahun`);
    console.log(`Gaji Pokok: Rp ${gaji.toLocaleString()}`);
    console.log(`Tunjangan: Rp ${tunjanganKaryawan.toLocaleString()}`);
    console.log(`Bonus: Rp ${bonus.toLocaleString()}`);
    console.log(`Total Gaji: Rp ${total.toLocaleString()}`);
    console.log("--------------------------------");
}
