import express from 'express'
const router = new express.Router()
import commands from '../commands'
import queries from '../queries'

router.get('/:query', (req, res, next) => {
  const { query } = req.params
  console.log(queries)
  if (!query || !(query in queries)) return next()
  queries[query](req.query)
    .then(result => {
      res.json(result)
    })
    .catch(next)
})

router.post('/:command', (req, res, next) => {
  const { command } = req.params
  if (!command || !(command in commands)) return next()
  commands[command](Object.assign({}, req.query, req.body))
    .then(result => {
      res.json(result)
    })
    .catch(next)
})


// development error handler
// will print stacktrace
if (process.env.NODE_ENV === 'development') {
  router.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      message: error.message,
      error: error,
      stack: error.stack,
    });
  });
}else{
  // production error handler
  // no stacktraces leaked to user
  router.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      message: error.message,
      error: {},
      stack: [],
    });
  });
}


router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});



module.exports = router
