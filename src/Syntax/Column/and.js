import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name : STATEMENTS.AND,
        constructor: function(column){
            return [`AND ${column._values.pop()}` , [column._params.pop()] ]
        }
    }
})()