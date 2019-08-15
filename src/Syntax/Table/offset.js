import { STATEMENTS } from '../../utils/constants'

export default (()=> {
  return {
    name : STATEMENTS.OFFSET,
    constructor: function(arg){
      return [ `OFFSET $` ,  arg ]
    }
  }
})()