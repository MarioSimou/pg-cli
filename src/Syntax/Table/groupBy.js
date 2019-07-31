import { STATEMENTS } from '../../constants'

export default (function(){
  return {
    name: STATEMENTS.GROUP_BY,
    constructor: function(columns){
      const statement = columns.map(column => column._fullColName ).join(',')

      return [ 'GROUP BY ' + statement ]
    }
  }
})()