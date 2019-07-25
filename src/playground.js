import PostgreSQL from './index'

const p1 = new PostgreSQL({ table : 'user' , schema : 'public', columns: ['username' , 'email'] })
console.log(p1.insertInto({ table : 'user' , schema: 'public'})
  .values({ username: 'john' , email: 'john@gmail.com'} , { username: 'foo' , email: 'foo@gmail.com' }).returning().all().end)

console.log(p1.select(p1.columns.username.as('user_name'), p1.columns.email.as('user_email')).from({ table : 'random' , schema: "public"}).where(p1.columns.email.equals(10)).end)
console.log(p1.update().set(p1.columns.username.equals('jonathan21') , p1.columns.email.equals('jonathan21@gmail.com')).where(p1.columns.username.equals('some')).returning().all().end)
console.log(p1.deleteFrom().where(p1.columns.email.equals('honathan@email')).end)