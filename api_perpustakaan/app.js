const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const db = require('./api/routes/data_buku')
const dm = require('./api/routes/data_mahasiswa')
const dp = require('./api/routes/data_petugas')
const dpinjam = require('./api/routes/data_peminjaman')
const dk = require('./api/routes/data_pengembalian')
const port = 4000

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true,
}))

app.get('/',(req, res) =>{
    res.json({info:'test'})
})

// data buku
app.get('/book', db.getBook)
app.get('/book/:id', db.getBookById)
app.post('/book', db.createBook)
app.put('/book/:id', db.updateBook)
app.delete('/book/:id', db.deleteBook)

// data mahasiswa
app.get('/mahasiswa', dm.getMahasiswa)
app.get('/mahasiswa/:id', dm.getMahasiswaById)
app.post('/mahasiswa', dm.createMahasiswa)
app.put('/mahasiswa/:id', dm.updateMahasiswa)
app.delete('/mahasiswa/:id', dm.deleteMahasiswa)

// data petugas
app.get('/petugas', dp.getPetugas)
app.get('/petugas/:id', dp.getPetugasById)
app.post('/petugas', dp.createPetugas)
app.put('/petugas/:id', dp.updatePetugas)
app.delete('/petugas/:id', dp.deletePetugas)

// data peminjaman
app.get('/peminjaman', dpinjam.getPeminjaman)
app.get('/peminjaman/:id', dpinjam.getPeminjamanById)
app.post('/peminjaman', dpinjam.createPeminjaman)
app.put('/peminjaman/:id', dpinjam.updatePeminjaman)
app.delete('/peminjaman/:id', dpinjam.deletePeminjaman)

//data pengembalian

app.get('/pengembalian', dk.getPengembalian)
app.get('/pengembalian/:id', dk.getPengembalianById)
app.post('/pengembalian', dk.createPengembalian)
app.put('/pengembalian/:id', dk.updatePengembalian)
app.delete('/pengembalian/:id', dk.deletePengembalian)



module.exports = app;



