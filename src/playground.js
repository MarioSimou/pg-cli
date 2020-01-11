import { Table } from './index'
import { DATA_TYPES } from './utils/constants'

const User = new Table({ 
  table : 'user' , 
  schema: 'public',
  columns: [
      {from: 'id', to: 'id'},
      {from: 'username', to: 'username'},
      {from: 'email', to: 'email'},
      {from: 'password', to:'password'},
      {from: 'role', to: 'role'},
      {from: 'isVerified', to: 'is_verified'},
      {from: 'createdAt', to: 'created_at'},
      {from: 'updatedAt', to: 'updated_at'}
  ]
})

const Offer = new Table({
table: 'offer',
schema: 'public',
columns: [
  {from: 'id', to: 'id'},
  {from: 'offerName', to: 'offer_name'},
  {from: 'price', to: 'price'},
  {from: 'userId', to: 'user_id'}
]
})

console.log(
  User.select(
    User.columns.isVerified
  )
  .from()
  .end
)

console.log(
  User
  .select()
  .from()
  .end
)

// console.log(
//   Offer.select(
//     Offer.columns.offerName,
//     Offer.columns.userId,
//     Offer.columns.price.sum()
//   )
//   .from()
//   .groupBy(
//     Offer.columns.offer_name
//   )
//   .having(
//     Offer.columns.price.sum().between(10,50).and(
//       Offer.columns.price.sum().equal(20)
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