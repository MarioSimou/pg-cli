import { STATEMENTS } from '../../utils/constants'

export default (function(){
  return {
    name : STATEMENTS.SUM,
    constructor: function(){
        return [ 'SUM' ]
    }
  }
})()