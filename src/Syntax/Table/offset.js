import { STATEMENTS } from '../../constants'

export default (()=> {
  return {
    name : STATEMENTS.OFFSET,
    constructor: function(arg){
      return [ `OFFSET $` ,  arg ]
    }
  }
})()