app = require('./app.js')
require('./database.js')
require('./config/passport');



app.listen(app.get('port'))

console.log(`Server on port ${app.get('port')}`);


