import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name : STATEMENTS.AND,
        constructor: function(column){
            this._operators.push('AND')
            this._params.push( column._params.pop())
            this._values.push(column._values.pop())
        }
    }
})()