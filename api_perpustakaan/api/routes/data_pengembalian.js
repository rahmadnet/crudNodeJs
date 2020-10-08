const {poll} = require('./../../helpers/postgres')

const getPengembalian = (req, res) => {
    poll.query('SELECT * FROM pengembalian', (err, result) => {
        if(err){
            throw err
        }
        res.status(200).json(result.rows)
    })
}

const getPengembalianById = (req,res) => {
    const id = parseInt(req.params.id)
    poll.query('SELECT * FROM pengembalian WHERE id = $1', [id], (err, result) => {
        if(err){
            throw err
        }
        res.status(200).json(result.rows)
    })
}

const createPengembalian = (req,res) => {
    const {id,mahasiswa_id, tgl_kembali, book_id, terlambat,petugas_id} = req.body
    poll.query('INSERT INTO pengembalian (id,mahasiswa_id,tgl_kembali,book_id,terlambat,petugas_id) VALUES ($1,$2,$3,$4,$5,$6)',
    [id,mahasiswa_id,tgl_kembali,book_id,terlambat,petugas_id], (err,result) => {
        if(err){
            throw err
        }
        res.status(201).send(`Pengembalian added with ID: ${id}`)
    })
}

const updatePengembalian = (req,res) => {
    const id = parseInt(req.params.id)
    const {mahasiswa_id,book_id,terlambat, petugas_id} = req.body

    poll.query('UPDATE pengembalian SET mahasiswa_id = $1,book_id = $2,terlambat = $3,petugas_id = $4 WHERE id = $5',
    [mahasiswa_id,book_id,terlambat,petugas_id,id], (err,result) =>{
        if(err){
            throw err
        }
        res.status(200).send(`Pengembalian modified with ID: ${id}`)
    })
   
}

const deletePengembalian = (req,res) => {
    const id = parseInt(req.params.id)
    poll.query('DELETE FROM pengembalian WHERE id = $1',[id], (err, result) => {
        if(err){
            throw err
        }
        res.status(200).send(`Pengembalian deleted with ID: ${id}`)
    })
}

module.exports = {
    getPengembalian,
    getPengembalianById,
    createPengembalian,
    updatePengembalian,
    deletePengembalian
}