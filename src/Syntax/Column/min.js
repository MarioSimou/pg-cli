import { STATEMENTS } from '../../constants'

export default (function(){
  return {
    name : STATEMENTS.MIN,
    constructor: function(){
        return [ `MIN(${this._fullColName})`]
    }
  }
})()