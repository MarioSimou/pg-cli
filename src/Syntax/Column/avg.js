import { STATEMENTS } from '../../constants'

export default (function(){
  return {
    name : STATEMENTS.AVG,
    constructor: function(){
        return [ `AVG(${this._fullColName})`]
    }
  }
})()