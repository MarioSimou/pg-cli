import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name : STATEMENTS.AND,
        constructor: function(column){
            return [`AND ${column._fullColName}${column._commands.pop().value }` , [column._params.pop()] ]
        }
    }
})()