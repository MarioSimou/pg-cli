import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.VALUES,
        constructor: function(args){
            const offset = this._params.length
            const n = args.length
            const columns = Object.keys(args[0])
            const colSize = columns.length
            const colNames = `(${columns.join(',')})`
            const statement = []
            const params = []

            for(let i= 0 + offset ; i < n + offset; i++){
                
                const record = args[i-offset]
                const recordParams = Object.values(record)
                const recordStatement = Object.keys(record).map( (v, vi) => `${v}=$${i*colSize+vi+1}`).join(',')
                if(recordParams.length !== colSize ) throw new Error('Inconstent values data structure')

                params.push(...recordParams)
                statement.push(recordStatement)
            }

            this._statement.push(`${colNames} VALUES ${statement.join(',')}`)
            this._params.push(...params)
        }
    }
})()