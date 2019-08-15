import { STATEMENTS } from '../../utils/constants'

export default (function(){
  return {
    name : STATEMENTS.BETWEEN,
    constructor: function(...args){
      if( args.length !== 2 ) throw new Error('Expected 2 paramaeters for between in')

      return [ 'BETWEEN' , args ]
    }
  }
})()