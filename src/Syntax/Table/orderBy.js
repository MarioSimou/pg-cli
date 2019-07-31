import { STATEMENTS } from '../../constants'

export default (function(){
  return {
    name: STATEMENTS.ORDER_BY,
    constructor: function(columns){
      const statement = columns.map( column => `${column._fullColName} ${column._commands.pop().value}` ).join(',')

      return [ 'ORDER BY ' + statement ]
    }
  }
})()