import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name : STATEMENTS.OR,
        constructor: function(column){
            this._operators.push('OR')
            this._params.push( column._params.pop())
            this._values.push(column._values.pop())
        }
    }
})()