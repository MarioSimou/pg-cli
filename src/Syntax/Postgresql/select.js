import { STATEMENTS } from '../../constants'  
import Column from '../../Column';

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
                statements.push(column._colName)
            }

            const statement = `SELECT ${statements.join(',') || '*' }`
            this._statement.push(statement)
        }
    }
})()