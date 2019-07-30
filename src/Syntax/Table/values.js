import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.VALUES,
        constructor: function(records){
            const statements = [] , params = [] , columns = new Set()

            for(let record of records){
                const statement = []
                for(let column of record){
                    if(!columns.has(column._colName)) columns.add(column._colName)
                    
                    column._values.shift()
                    params.push(column._params.shift())
                    statement.push(`$`)

                }
                statements.push(`(${statement.join(',')})`)
            }

            return [ `(${Array.from(columns).join(',')}) VALUES ${statements.join(',')}` , params ]
            
        }
    }
})()