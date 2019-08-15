import { STATEMENTS } from '../../utils/constants'
import { stat } from 'fs';

export default (function(){
  return {
    name: STATEMENTS.ORDER_BY,
    constructor: function(columns){
      const stack = []

      for(let column of columns){
        const [ value ] = Array.from(column._commands.values())

        stack.push( column._fullColName + ' ' + value )
        column._flush()
      }


      return [ 'ORDER BY ' + stack.join(',') ]
    }
  }
})()