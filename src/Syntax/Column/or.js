import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name : STATEMENTS.OR,
        constructor: function(column){
            this._operators.push('OR')
            
            if( column._params.length )
                this._params.push( column._params.pop())

            if( column._values.length )
            this._values.push( column._values.pop())
        }
    }
})()