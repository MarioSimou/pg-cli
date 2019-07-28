import pgSQL from './index'

const p1 = new pgSQL({ table : 'user' , schema : 'public', columns: [ 'id', 'username' , 'email'] })
const p2 = new pgSQL({ table : 'products' , schema: 'public', columns: ['prodName', 'price']})

console.log(p1.insertInto({ table : 'user' , schema: 'public'})
  .values( [
    p1.columns.username.equal('john'),
    p1.columns.email.equal('john@gmail.com'),
  ]
  ).returning().all().end)

console.log(
    p1.select(p1.columns.username.as('user_name'), p1.columns.email.as('user_email'))
      .from({ table : 'random' , schema: "public"})
      .where(
        p1.columns.email.equal(10)
        .and(p1.columns.username.unequal('jonathan'))
        .or(p1.columns.email.gte(2))
        )
      .end)

console.log(
  p1.update()
    .set(p1.columns.username.equal('jonathan21') , p1.columns.email.equal('jonathan21@gmail.com'))
    .where(p1.columns.username.equal(1).and(p1.columns.id.equal(1)))
    .returning()
    .all()
    .end
)


console.log(
  p1.deleteFrom()
    .where(
        p1.columns.email.equal('honathan@email')
        .or(p1.columns.username.all(
          p2.select(p2.columns.prodName , p2.columns.price.as('prod_price')).from().end)
        ))
    .end
  )