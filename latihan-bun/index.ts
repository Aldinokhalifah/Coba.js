// index.ts
import express, { type Request, type Response, type NextFunction } from 'express';
import router from './src/routes/user';
import { testConnection } from './src/config/db';

const app = express();
const PORT = 3000;

// Middleware untuk membaca JSON body
app.use(express.json());

const userRoutes = router;

// Middleware kustom sederhana (Logger)
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ke ${req.url}`);
    next();
});

// Endpoint GET utama
app.get('/', (req: Request, res: Response) => {
    res.send('Halo! Express ini berjalan di atas runtime Bun 🚀');
});

// Endpoint tes kondeksi database
app.get('/test-connection', async (req: Request, res: Response) => {
    const ok = await testConnection();
    if (ok) {
        res.status(200).json({
        message: "Koneksi database berhasil",
        });
    } else {
        res.status(500).json({
        message: "Koneksi database gagal",
        });
    }
})

app.use('/api/users', userRoutes);


// Jalankan server
app.listen(PORT, () => {
    console.log(`Server Express-Bun aktif di http://localhost:${PORT}`);
});