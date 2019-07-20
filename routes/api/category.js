const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
  const db = req.client.collection('products');

  db.find({}, {name: 1, description: 1, image: 1})
    .toArray((err, products) => {
      res.json(products.map(({_id, ...other}) => ({id: _id, ...other})));
    });
});

module.exports = router;
