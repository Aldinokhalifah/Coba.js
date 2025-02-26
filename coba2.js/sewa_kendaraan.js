const penyewaan = [
    { name: "Pelanggan 1", kendaraan: "motor", lamaSewa: 4, asuransi: true },
    { name: "Pelanggan 2", kendaraan: "mobil", lamaSewa: 2, asuransi: false },
    { name: "Pelanggan 3", kendaraan: "bus", lamaSewa: 8, asuransi: true }
];

const kendaraan = {
    motor: 100000,
    mobil: 300000,
    bus: 800000
};

const asuransi = {
    motor: 20000,
    mobil: 50000,
    bus: 100000
};

for (const sewa of penyewaan) {
    let hargaSewa = kendaraan[sewa.kendaraan] * sewa.lamaSewa;
    let hargaAsuransi = sewa.asuransi ? asuransi[sewa.kendaraan] * sewa.lamaSewa : 0;
    let total = hargaSewa + hargaAsuransi;
    
    let diskon = 0;
    if (sewa.lamaSewa > 3 && sewa.lamaSewa <= 7) {
        diskon = hargaSewa * 0.05;
    } else if (sewa.lamaSewa > 7) {
        diskon = hargaSewa * 0.1;
    }

    let totalPembayaran = total - diskon;

    console.log(`Nama: ${sewa.name}`);
    console.log(`Jenis Kendaraan: ${sewa.kendaraan.charAt(0).toUpperCase() + sewa.kendaraan.slice(1)}`);
    console.log(`Lama Sewa: ${sewa.lamaSewa} hari`);
    console.log(`Asuransi: ${sewa.asuransi ? "Ya" : "Tidak"}`);
    console.log(`Harga Sewa Per Hari: Rp ${kendaraan[sewa.kendaraan].toLocaleString()}`);
    console.log(`Biaya Asuransi Per Hari: Rp ${asuransi[sewa.kendaraan].toLocaleString()}`);
    console.log(`Total Sebelum Diskon: Rp ${total.toLocaleString()}`);
    console.log(`Diskon: Rp ${diskon.toLocaleString()}`);
    console.log(`Total Pembayaran: Rp ${totalPembayaran.toLocaleString()}`);
    console.log("--------------------------------");
}