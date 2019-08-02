import Table from './index'
import { DATA_TYPES } from './constants'

const User = new Table({ 
  table : 'user' , 
  schema: 'public',
  columns: [
      'id',
      'username',
      'email',
      'password',
      'role'
  ]
})

const Offer = new Table({
table: 'offer',
schema: 'public',
columns: [
  'id',
  'offer_name',
  'price',
  'user_id'
]
})

console.log(
  User.select().from().where(
    User.columns.id.between(1,10)
  )
  .end
)


// console.log(
//   User.select(
//     User.columns.username,
//     User.columns.id.sum()
//   )
//   .from()
//   .groupBy(
//     User.columns.username
//   )
//   .having(
//     User.columns.id.sum().gt(5).and(
//       User.columns.id.sum().lt(20)
//     )
//   )
//   .end
// )

// console.log(
//   User.select(
//     User.columns.username,
//     User.columns.id.sum()
//   )
//   .from()
//   .groupBy( 
//     User.columns.username
//   )
//   .having(
//     User.columns.id.sum().gt(10)
//   )
//   .end
// )