import express from 'express'
const router = new express.Router()
import commands from '../commands'
import queries from '../queries'


router.get('/session', (req, res, next) => {
  res.json({
    user: req.user
  })
});

router.post('/logout', (req, res, next) => {
  req.logout();
  res.json(null)
});

router.get('/skills', (req, res, next) => {
  queries.skills()
    .then(skills => {
      res.json(skills)
    })
    .catch(next)
});
// router.get('/:query', (req, res, next) => {
//   const { query } = req.params
//   console.log(queries)
//   if (!query || !(query in queries)) return next()
//   queries[query](req.query)
//     .then(result => {
//       res.json(result)
//     })
//     .catch(next)
// })

// router.post('/:command', (req, res, next) => {
//   const { command } = req.params
//   if (!command || !(command in commands)) return next()
//   commands[command](Object.assign({}, req.query, req.body))
//     .then(result => {
//       res.json(result)
//     })
//     .catch(next)
// })

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

router.use((error, req, res, next) => {
  const stack = process.env.NODE_ENV === 'development' ?
    error.stack //.split(/\n/)
  :
    null
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
      stack: stack,
    },
  });
});

module.exports = router
