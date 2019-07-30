import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name : STATEMENTS.OR,
        constructor: function(column){
            this._values.push( `OR ${column._values.pop()}` ) 
            this._params.push( column._params.pop() )
        }
    }
})()