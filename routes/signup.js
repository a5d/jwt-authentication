import {Router} from 'express';

const router = Router();

router.use((req, res, next) => {
  const user = req.body

  req.db.find({email: user.email}).limit(1).toArray((users, err) => {
    if (users.length > 0) {
      res.status(404).json({error: 'Email already use'})
    } else {
      req.db.insertOne(user, (err) => {
        if (err) {
          res.status(404).json({error: 'Insert Error'})
        } else {
          res.json({msg: 'Registered'})
        }
      })
    }
  })

  next()
});

export default router