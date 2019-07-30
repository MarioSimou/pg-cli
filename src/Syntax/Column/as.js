import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name : STATEMENTS.AS,
        constructor: function(...args){
            return [ `${this._fullColName} as ${args[0]}` ]
        }
    }
})()