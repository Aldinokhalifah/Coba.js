const { nanoid } = require('nanoid');
const Book = require('../model/Book');

const createBook = (req, res) => {
    try {
        const {name, year, author, summary, publisher, pageCount, readPage, reading} = req.body;

        if(!name) {
            return res.status(400).json({
                status: 'fail',
                message: 'Gagal menambahkan buku. Mohon isi nama buku',
            });
        }

        if(!year) {
            return res.status(400).json({
                status: 'fail',
                message: 'Tahun harus diisi',
            });
        }

        if(!author) {
            return res.status(400).json({
                status: 'fail',
                message: 'Author harus diisi',
            });
        }

        if(!summary) {
            return res.status(400).json({
                status: 'fail',
                message: 'Summary harus diisi',
            });
        }

        if(!publisher) {
            return res.status(400).json({
                status: 'fail',
                message: 'Publisher harus diisi',
            });
        }

        if(!pageCount) {
            return res.status(400).json({
                status: 'fail',
                message: 'Nomor halaman harus diisi',
            });
        }

        if(readPage < 0) {
            return res.status(400).json({
                status: 'fail',
                message: 'Halaman yang dibaca tidak boleh kurang dari 0',
            });
        }

        if(readPage > pageCount) {
            return res.status(400).json({
                status: 'fail',
                message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
            });
        }

        const newBook = {
            bookId: nanoid(16),
            name: name,
            year: year,
            author: author,
            summary: summary,
            publisher: publisher,
            pageCount: pageCount,
            readPage: readPage,
            finished: readPage === pageCount,
            reading: readPage > 1,
            insertedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        Book.push(newBook);

        const isSuccess = Book.filter((book) => book.bookId === newBook.bookId)[0];

        if(isSuccess) {
            const response = {
                status: 'success',
                message: 'Buku berhasil ditambahkan',
                data: newBook
            }
            res.status(201).json(response);
        }
    } catch (error) {
        return res.status(422).json({
            message: 'Isi buku tidak valid',
            error: error.message,
        });
    }

}

const getAllBooks = (req, res) => {
    try {
        const { name, reading, finished } = req.query;

        if (Book.length === 0) {
            return res.status(200).json({
                status: 'success',
                data: {
                    books: []
                }
            });
        }

        let filteredBooks = [...Book];

        if (name !== undefined) {
            const searchName = name.toLowerCase();
            filteredBooks = filteredBooks.filter(book =>
                book.name.toLowerCase().includes(searchName)
            );
        }

        if (reading !== undefined) {
            const isReading = reading === '1';
            filteredBooks = filteredBooks.filter(book => book.reading === isReading);
        }

        if (finished !== undefined) {
            const isFinished = finished === '1'; 
            filteredBooks = filteredBooks.filter(book => book.finished === isFinished);
        }

        const mapToResponse = (book) => ({
            id: book.bookId,
            name: book.name,
            publisher: book.publisher
        });

        const books = filteredBooks.map(mapToResponse);

        return res.status(200).json({
            status: 'success',
            data: {
                books
            }
        });

    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Terjadi kesalahan pada server',
            error: error.message
        });
    }
};

const getDetailBook = (req, res) => {
    try {
        const { bookId } = req.params;

        const foundBook = Book.find((book) => book.bookId === bookId);

        if (foundBook) {
            const book = {
                id: foundBook.bookId,
                name: foundBook.name,
                year: foundBook.year,
                author: foundBook.author,
                summary: foundBook.summary,
                publisher: foundBook.publisher,
                pageCount: foundBook.pageCount,
                readPage: foundBook.readPage,
                finished: foundBook.pageCount === foundBook.readPage,
                reading: false,
                insertedAt: foundBook.insertedAt,
                updatedAt: foundBook.updatedAt,
            };

            const response = {
                status: 'success',
                message: `Mengambil buku ID: ${bookId}`,
                data: { book } 
            };
            res.status(200).json(response);
        } else {
            const response = {
                status: 'fail',
                message: "Buku tidak ditemukan",
            };
            res.status(404).json(response);
        }
    } catch (error) {
        res.status(500).json({
            message: 'Terjadi kesalahan pada server',
            error: error.message
        });
    }
};

const updateBook = (req, res) => {
    try {
        const { bookId } = req.params;
        const {
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading
        } = req.body;

        if (!name) {
            return res.status(400).json({
                status: 'fail',
                message: 'Gagal memperbarui buku. Mohon isi nama buku'
            });
        }

        if (pageCount === undefined || pageCount <= 0) {
            return res.status(400).json({
                status: 'fail',
                message: 'Gagal memperbarui buku. pageCount harus diisi dan lebih besar dari 0'
            });
        }

        if (readPage === undefined || readPage < 0) {
            return res.status(400).json({
                status: 'fail',
                message: 'Gagal memperbarui buku. readPage tidak boleh kurang dari 0'
            });
        }

        if (readPage > pageCount) {
            return res.status(400).json({
                status: 'fail',
                message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
            });
        }

        const index = Book.findIndex((book) => book.bookId === bookId);

        if (index === -1) {
            return res.status(404).json({
                status: 'fail',
                message: 'Gagal memperbarui buku. Id tidak ditemukan'
            });
        }

        const finished = readPage === pageCount;
        const isReading = reading ?? (readPage > 0);

        Book[index] = {
            ...Book[index],
            name,
            year: Number(year),
            author,
            summary,
            publisher,
            pageCount: Number(pageCount),
            readPage: Number(readPage),
            finished,
            reading: isReading,
            updatedAt: new Date().toISOString()
        };

        return res.status(200).json({
            status: 'success',
            message: 'Buku berhasil diperbarui'
        });

    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Terjadi kesalahan pada server',
            error: error.message
        });
    }
};

const deleteBook = (req, res) => {
    try {
        const { bookId } = req.params;

        const index = Book.findIndex((book) => book.bookId === bookId);

        if (index === -1) {
            return res.status(404).json({
                status: 'fail',
                message: 'Buku gagal dihapus. Id tidak ditemukan'
            });
        }

        Book.splice(index, 1);

        return res.status(200).json({
            status: 'success',
            message: 'Buku berhasil dihapus'
        });

    } catch (error) {
        return res.status(500).json({ 
            status: 'error',
            message: 'Gagal menghapus buku',
            error: error.message
        });
    }
};

module.exports = {createBook, getAllBooks, getDetailBook, updateBook, deleteBook};