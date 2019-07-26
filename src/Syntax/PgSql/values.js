import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.VALUES,
        constructor: function(records){
            const statements = [] , columns = new Set()

            for(let record of records){
                const statement = []
                for(let column of record){
                    if(!columns.has(column._colName)){
                        columns.add(column._colName)
                    }
                    statement.push(`$${this._params.length+1}`)
                    this._params.push(column._params.pop())
                }
                statements.push(`(${statement.join(',')})`)
            }
            this._statement.push(`(${Array.from(columns).join(',')}) VALUES ${statements.join(',')}`)
        }
    }
})()