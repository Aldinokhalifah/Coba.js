// index.ts
import express, { type Request, type Response, type NextFunction } from 'express';
import router from './src/routes/user';

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

app.use('/api/users', userRoutes);


// Jalankan server
app.listen(PORT, () => {
    console.log(`Server Express-Bun aktif di http://localhost:${PORT}`);
});