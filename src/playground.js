import PostgreSQL from './index'

const p1 = new PostgreSQL({ table : 'user' , schema : 'public' })
console.log(p1.insertInto({ table : 'user' , schema: 'public'})
  .values({ username: 'john' , email: 'john@gmail.com'} , { username: 'foo' , email: 'foo@gmail.com' }).returning().all()
  .end)
