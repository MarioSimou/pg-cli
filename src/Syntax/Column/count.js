import { STATEMENTS } from '../../constants'

export default (function(){
  return {
    name : STATEMENTS.COUNT,
    constructor: function(){
        return [ `COUNT(${this._fullColName})`]
    }
  }
})()