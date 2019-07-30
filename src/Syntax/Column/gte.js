import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.GTE,
        constructor: function(...arg){
            return [ this._fullColName + '>=' , arg ]
        }
    }
})()