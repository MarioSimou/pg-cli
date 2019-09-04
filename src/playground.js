import { Table } from './index'
import { DATA_TYPES } from './utils/constants'

const User = new Table({ 
  table : 'user' , 
  schema: 'public',
  columns: [
      'id',
      'username',
      'email',
      'password',
      'role',
      'is_verified',
      'created_at',
      'updated_at'
  ]
})

// const Offer = new Table({
// table: 'offer',
// schema: 'public',
// columns: [
//   'id',
//   'offer_name',
//   'price',
//   'user_id'
// ]
// })

const mapArgsToWhereColumns = ( source , Model ) => Object.entries( source ).reduce( ( m , [k,v] , i ) => {
  if( i === 0 ) return m.columns[k].equal( v )
  else return m.and( Model.columns[k].equal( v ) )
} , Model)

const where = {
  id: 1
}


console.log(
  User.columns.is_verified === User.columns.isVerified,
  User.columns.updated_at === User.columns.updatedAt,
  User.columns.createdAt === User.columns.created_at
)

// console.log(
//   Offer.select(
//     Offer.columns.offer_name,
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