import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name : STATEMENTS.OR,
        constructor: function(column){
            return [ `OR ${column._commands.pop().value }` , [column._params.pop()] ]
        }
    }
})()