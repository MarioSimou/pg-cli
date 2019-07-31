import { STATEMENTS } from '../../constants'  
export default (function(){
    return {
        name: STATEMENTS.IS,
        constructor: function(_){
            return [ this._commands.length ? 'IS' :  `${this._fullColName} IS`]
        }
    }
})()