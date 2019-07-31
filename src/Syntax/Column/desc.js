import { STATEMENTS } from '../../constants'

export default (function(){
  return {
    name : STATEMENTS.DESC,
    constructor: function(_){
      return ['DESC']
    }
  }
})()