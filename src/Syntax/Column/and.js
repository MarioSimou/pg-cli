import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name : STATEMENTS.AND,
        constructor: function(column){
            this._values.push( `AND ${column._values.pop()}` ) 
            this._params.push( column._params.pop() )
        }
    }
})()