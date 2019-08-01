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
  User.select(
    User.columns.username.as('user_name')
)
.from()
.where(
    User.columns.role.equal('basic')
    .or(
        User.columns.role.equal('edit')
    )
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