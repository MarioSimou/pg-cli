import { STATEMENTS } from '../../utils/constants'

export default (function(){
  return {
    name : STATEMENTS.COUNT,
    constructor: function(){
        return [ `COUNT`]
    }
  }
})()