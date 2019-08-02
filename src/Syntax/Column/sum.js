import { STATEMENTS } from '../../constants'

export default (function(){
  return {
    name : STATEMENTS.SUM,
    constructor: function(){
        return [ 'SUM' ]
    }
  }
})()