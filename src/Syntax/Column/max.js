import { STATEMENTS } from '../../utils/constants'

export default (function(){
  return {
    name : STATEMENTS.MAX,
    constructor: function(){
        return [ `MAX`]
    }
  }
})()