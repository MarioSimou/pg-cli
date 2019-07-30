import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.EQUAL,
        constructor: function(...arg){
            return [ this._fullColName + '=' , arg ]
        }
    }
})()