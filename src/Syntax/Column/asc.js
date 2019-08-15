import { STATEMENTS } from '../../utils/constants'

export default (function(){
  return {
    name : STATEMENTS.ASC,
    constructor: function(_){
      return ['ASC']
    }
  }
})()