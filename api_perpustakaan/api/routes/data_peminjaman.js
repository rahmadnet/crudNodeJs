const {poll} = require('./../../helpers/postgres')

const getPeminjaman = (req,res) => {
    poll.query('SELECT * FROM peminjaman', (err, result) => {
        if(err){
            throw err
        }
        res.status(200).json(result.rows)
    })
}

const getPeminjamanById = (req,res) => {
    const id = parseInt(req.params.id)
    poll.query('SELECT * FROM peminjaman WHERE id = $1', [id], (err,result) => {
        if(err){
            throw err
        }
        res.status(200).json(result.rows)
    })
}

const createPeminjaman = (req,res) => {
    const {id,mahasiswa_id,book_id,tgl_pinjam,petugas_id} = req.body
    poll.query('INSERT INTO peminjaman (id,mahasiswa_id,book_id,tgl_pinjam,petugas_id) VALUES ($1,$2,$3,$4,$5)',
    [id,mahasiswa_id,book_id,tgl_pinjam,petugas_id], (err,result) => {
        if (err){
            throw err
        }
        res.status(201).send(`Peminjam added with ID:${id}`)
    })
}

const updatePeminjaman = (req,res) => {
    const id = parseInt(req.params.id)
    const {mahasiswa_id,book_id,tgl_pinjam,petugas_id} = req.body

    poll.query (
        'UPDATE peminjaman SET mahasiswa_id = $1, book_id = $2, tgl_pinjam = $3, petugas_id = $4 WHERE id = $5',
        [mahasiswa_id,book_id,tgl_pinjam,petugas_id,id],
        (err,result) => {
            if(err){
                throw err
            }
            res.status(200).send(`Peminjaman modified with ID: ${id}`)
        }
    )
}

const deletePeminjaman = (req,res) => {
    const id = parseInt(req.params.id)

    poll.query('DELETE FROM peminjaman WHERE id = $1',[id], (err,result) => {
        if(err){
            throw err
        }
        res.status(200).send(`Peminjaman delete with ID: ${id}`)
    })
}

module.exports = {
    getPeminjaman,
    getPeminjamanById,
    createPeminjaman,
    updatePeminjaman,
    deletePeminjaman
}