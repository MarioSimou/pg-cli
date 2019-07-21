import PostgresSQL from './index'
import Where from './Syntax/where'
import SelectionSet from './Syntax/selectionSet'

const connectionString = 'postgresql://postgres:postgres@localhost:5432/clustering_nodejs_dev'
new PostgresSQL({ connectionString }).connect()

const w = new Where('user').equals('doe').and.unequal('doe@gmail.com', 'email' ).sql
console.log(w)

const s = new SelectionSet('user').rename('my_user').add('email').rename('user_email').add('username').sql
console.log(s)