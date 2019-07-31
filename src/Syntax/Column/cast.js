import { STATEMENTS } from '../../constants'

export default (function(){
  return {
    name: STATEMENTS.CAST,
    constructor: function(arg){
      return ['::' + arg ]
    }
  }
})()