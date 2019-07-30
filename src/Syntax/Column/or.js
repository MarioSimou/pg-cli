import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name : STATEMENTS.OR,
        constructor: function(column){
            return [ `OR ${column._values.pop()}` , [column._params.pop()] ]
        }
    }
})()