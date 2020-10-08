const {poll} = require('./../../helpers/postgres')

const getMahasiswa = (req,res) => {
    poll.query('SELECT * FROM mahasiswa', (err,result) =>{
        if(err){
            throw err
        }
        res.status(200).json(result.rows)
    })
}

const getMahasiswaById = (req,res) => {
    const id = parseInt(req.params.id)
    poll.query('SELECT * FROM mahasiswa WHERE id = $1', [id], (err,result) => {
        if(err){
            throw err
        }
        res.status(200).json(result.rows)
    })
}

const createMahasiswa = (req, res) => {
    const {id,nim, nama, prodi} = req.body
    poll.query('INSERT INTO mahasiswa (id, nim, nama, prodi) values ($1,$2,$3,$4)',
    [id,nim,nama,prodi], (err, result) => {
        if(err){
            throw err
        }
        res.status(201).send(`Mahasiswa added with ID:${id}`)
    })
}

const updateMahasiswa = (req, res) => {
    const id = parseInt(req.params.id)
    const { nim, nama,prodi } = req.body
  
    poll.query(
      'UPDATE mahasiswa SET nim = $1, nama = $2 , prodi = $3 WHERE id = $4',
      [nim, nama,prodi, id],
      (err, results) => {
        if (err) {
          throw err
        }
        res.status(200).send(`Mahasiswa modified with ID: ${id}`)
      }
    )
  }
 
  const deleteMahasiswa = (request, response) => {
    const id = parseInt(request.params.id)
  
    poll.query('DELETE FROM mahasiswa WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Mahasiswa deleted with ID: ${id}`)
    })
  }

  module.exports = {
      getMahasiswa,
      getMahasiswaById,
      createMahasiswa,
      updateMahasiswa,
      deleteMahasiswa
  }