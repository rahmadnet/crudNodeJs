const {poll} = require('./../../helpers/postgres')

const getUniversitas = (req,res) => {
    poll.query('SELECT * FROM data_universitas', (error, result) => {
        if(error){
            throw error
        }
        res.status(200).json(result.rows)
    })
}

const getUniversitasById = (req, res) => {
    const id = parseInt(req.params.id)

    poll.query('SELECT * FROM data_universitas where id = $1',[id],(error,result) => {
        if(error){
            throw error
        }
        res.status(200).json(result.rows)
    })
}

const createUniversitas = (req, res) => {
    const {id, name_universitas, city} = req.body
   poll.query('INSERT INTO data_universitas(id, name_universitas, city) VALUES ($1,$2,$3)',
   [id,name_universitas, city], (error,result) => {
       if(error){
           throw error
       }
       res.status(201).send(`Universitas added with ID: ${id}`)
   })
}

const updateUniversitas = (req, res) => {
    const id = parseInt(req.params.id)
    const {name_universitas, city} = req.body

    poll.query('UPDATE data_universitas SET name_universitas = $1, city = $2 WHERE id = $3',[name_universitas,city,id], (error, result) => {
        if(error) {
            throw error
        }
        res.status(200).send(`Uiversitas modified with ID: ${id}`)
    })
}

const deleteUniversitas = (req, res) => {
    const id = parseInt(req.params.id)
    poll.query('DELETE FROM data_universitas WHERE id = $1',[id], (error, result) => {
        if(error){
            throw error
        }
        res.status(200).send(`Universitas deleted with ID: ${id}`)
    })
}
module.exports = {
    getUniversitas,
    getUniversitasById,
    createUniversitas,
    updateUniversitas,
    deleteUniversitas
}