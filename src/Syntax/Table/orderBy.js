import { STATEMENTS } from '../../constants'

export default (function(){
  return {
    name: STATEMENTS.ORDER_BY,
    constructor: function(columns){
      const statement = columns.map( column => `${column._fullColName} ${column._values.pop()}` ).join(',')

      return [ 'ORDER BY ' + statement ]
    }
  }
})()