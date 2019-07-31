import { STATEMENTS } from '../../constants'  
export default (function(){
    return {
        name: STATEMENTS.IS,
        constructor: function(_){
            return [ this._values.length ? 'IS' :  `${this._fullColName} IS`]
        }
    }
})()