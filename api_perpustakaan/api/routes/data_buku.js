const {poll} = require('./../../helpers/postgres');

const getBook = (req,res) => {
    poll.query('select * from book', (error,result) => {
        if(error){
            throw error
        }
        res.status(200).json(result.rows)
    })
}

const getBookById = (req,res) => {
    const id = parseInt(req.params.id)

    poll.query('select * from book where id = $1',[id], (error,result) =>{
        if(error) {
            throw error
        }
        res.status(200).json(result.rows)
    })
}

const createBook = (req,res) => {
    const {id, judul, pengarang, penerbit, isbn, jumlah}= req.body

    poll.query('insert into book (id, judul, pengarang, penerbit, isbn, jumlah) values ($1,$2,$3,$4,$5, $6)', 
    [id, judul, pengarang,penerbit, isbn, jumlah],
    (error, result) =>
        {
            if(error) {
              throw error
            }
        res.status(201).send(`Book added with ID: ${id}`)
        }
    )
}

const updateBook = (req,res) => {
    const id = parseInt(req.params.id)
    const {judul,pengarang,penerbit,isbn,jumlah} = req.body

    poll.query('update book set judul = $1, pengarang = $2, penerbit = $3, isbn = $4, jumlah = $5 where id = $6',
        [judul, pengarang, penerbit, isbn, jumlah,id],
        (error, result) =>{
            if(error) {
                throw error
            }
            res.status(200).send(`Book modified with ID :${id}`)
        }
    )
}

const deleteBook = (req, res) => {
    const id = parseInt(req.params.id)

    poll.query('delete from book where id = $1',[id], (error,result) => {
            if (error) {
                throw error
            }
            res.status(200).send(`Book deleted with ID: ${id}`)
        }
    )
}

module.exports = {
    getBook,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
}