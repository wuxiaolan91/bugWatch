const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
app.use(bodyParser())
const router = require('koa-router')()
const bugController = require('../controllers/bug.js')
const user = require('../controllers/user')
app.use(router.routes(),router.allowedMethods())
app.use(bodyParser())
router.get('/bug/watch', bugController.bugWatch)
router.get('/bug/email', () => {
  const email = require('../controllers/user')
})
router.post('/user', user.searchuser)
router.post('/user/delete', user.delete)
module.exports = app
