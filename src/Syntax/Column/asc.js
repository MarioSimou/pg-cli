import { STATEMENTS } from '../../constants'

export default (function(){
  return {
    name : STATEMENTS.ASC,
    constructor: function(_){
      return ['ASC']
    }
  }
})()