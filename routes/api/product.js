const {Router} = require('express')

const router = Router()
const {ObjectId} = require('mongodb')

router.post('/', (req, res) => {
  const db = req.client.collection('products')
  db.insertOne(req.body, (err2) => {
    if (err2) {
      res.status(400).json({error: 'Insert Error'})
    } else {
      res.json({msg: 'Addded'})
    }
  })
})

router.get('/:id', (req, res) => {
  const {id} = req.params
  const db = req.client.collection('products')
  db.find({_id: ObjectId(id)}).limit(1).toArray((err, products) => {
    const {_id, ...other} = products[0]
    res.json({id: _id, ...other})
  })
})

router.post('/:id', (req, res) => {
  const {id} = req.params

  const db = req.client.collection('products')
  db.updateOne({_id: ObjectId(id)}, {$set: req.body}, (err2) => {
    if (err2) {
      res.status(400).json({error: 'Update Error ' + err2})
    } else {
      res.json({msg: 'Updated'})
    }
  })
})

router.delete('/:id', (req, res) => {
  const {id} = req.params

  const db = req.client.collection('products')
  db.deleteOne({_id: ObjectId(id)}, ((err, obj) => {
    res.json(obj.deletedCount)
  }))
})

module.exports = router
