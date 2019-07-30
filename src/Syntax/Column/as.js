import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name : STATEMENTS.AS,
        constructor: function(...args){
            this._values.push(`${this._fullColName} as ${args[0]}`)
        }
    }
})()