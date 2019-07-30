import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.SELECT,
        constructor: function(columns){
            const statements = []
            
            for(let column of columns){
                if(column._values.length){
                    statements.push(column._values.pop())
                    continue
                } 
                statements.push(column._fullColName)
            }

            return [ `SELECT ${statements.join(',') || '*' }` ]
        }
    }
})()