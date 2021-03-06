// Load Controllers:
const authenticateRoute = require('../controllers/authenticateRoute'),
  authRoute = require('../controllers/authRoute'),
  studentRoute = require('../controllers/studentRoute'),
  registerRoute = require('../controllers/registerRoute'),
  experimentalRoute = require('../controllers/experimentalRoute'),
  teacherRoute = require('../controllers/teacherRoute'),
  paymentRoute = require('../controllers/paymentRoute'),
  checkRoute = require('../controllers/checkRoute'),
  cronogramRoute = require('../controllers/cronogramRoute'),
  evaliationRoute = require('../controllers/evaliationRoute'),
  anamneseRoute = require('../controllers/anamneseRoute'),
  fixedRoute = require('../controllers/fixedRoute'),
  extraRoute = require('../controllers/extraRoute'),
  variableRoute = require('../controllers/variableRoute');

const pathRoute = '/kaizen/api/';
// Server-Side Routes:
module.exports = app => {
  console.log('⚙️  Server side routes loaded...');
  app
    .use(pathRoute + 'authenticate', authenticateRoute)
    .use(pathRoute + 'admin', authRoute)
    .use(pathRoute + 'student', studentRoute)
    .use(pathRoute + 'register', registerRoute)
    .use(pathRoute + 'experimental', experimentalRoute)
    .use(pathRoute + 'teacher', teacherRoute)
    .use(pathRoute + 'payment', paymentRoute)
    .use(pathRoute + 'check', checkRoute)
    .use(pathRoute + 'cronogram', cronogramRoute)
    .use(pathRoute + 'evaliation', evaliationRoute)
    .use(pathRoute + 'anamnese', anamneseRoute)
    .use(pathRoute + 'expenses/fixed', fixedRoute)
    .use(pathRoute + 'expenses/extra', extraRoute)
    .use(pathRoute + 'expenses/variable', variableRoute);
};
