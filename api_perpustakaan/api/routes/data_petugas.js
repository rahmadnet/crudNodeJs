const {poll} = require('./../../helpers/postgres')

const getPetugas = (req,res) => {
    poll.query('SELECT * FROM petugas', (err,result) =>{
        if(err){
            throw err
        }
        res.status(200).json(result.rows)
    })
}

const getPetugasById = (req,res) => {
    const id = parseInt(req.params.id)
    poll.query('SELECT * FROM petugas WHERE id = $1', [id], (err,result) => {
        if(err){
            throw err
        }
        res.status(200).json(result.rows)
    })
}

const createPetugas = (req, res) => {
    const {id,nip, nama} = req.body
    poll.query('INSERT INTO petugas (id, nip, nama) values ($1,$2,$3)',
    [id,nip,nama], (err, result) => {
        if(err){
            throw err
        }
        res.status(201).send(`Petugas added with ID:${id}`)
    })
}

const updatePetugas = (req, res) => {
    const id = parseInt(req.params.id)
    const { nip, nama} = req.body
  
    poll.query(
      'UPDATE petugas SET nip = $1, nama = $2 WHERE id = $3',
      [nip, nama, id],
      (err, results) => {
        if (err) {
          throw err
        }
        res.status(200).send(`Petugas modified with ID: ${id}`)
      }
    )
  }
 
  const deletePetugas = (request, response) => {
    const id = parseInt(request.params.id)
  
    poll.query('DELETE FROM petugas WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Petugas deleted with ID: ${id}`)
    })
  }

  module.exports = {
      getPetugas,
      getPetugasById,
      createPetugas,
      updatePetugas,
      deletePetugas
  }