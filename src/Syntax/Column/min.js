import { STATEMENTS } from '../../utils/constants'

export default (function(){
  return {
    name : STATEMENTS.MIN,
    constructor: function(){
        return [ 'MIN' ]
    }
  }
})()