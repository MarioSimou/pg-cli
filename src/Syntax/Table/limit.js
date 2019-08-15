import { STATEMENTS } from '../../utils/constants'

export default (()=> {
  return {
    name : STATEMENTS.LIMIT,
    constructor: function(arg){
      return [ `LIMIT $` ,  arg ]
    }
  }
})()