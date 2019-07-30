import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.SET,
        constructor: function(columns){
            const statement = [] , params = []
            
            for(let column of columns){
                params.push(column._params.pop())
                statement.push(`${column._values.pop()}$`)
            }

            return [ `SET ${statement.join(',')}` , params ] 
        }
    }
})()