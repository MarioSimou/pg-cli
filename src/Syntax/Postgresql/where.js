import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.WHERE,
        constructor: function(columns){
            const [column] = columns
            let offset = this._params.length + 1
            const statements = [], params = []
            const regex = /(IN||BETWEEN||NOT||ANY||ALL)/

            while(column._values.length){
                const value = column._values.shift()
                // if the statement is any the regex options, the value is handled differently
                if( regex.test( value )){   
                    statements.push( value)
                    continue
                }

                const param = column._params.shift()
                const operator = column._operators.shift() || ''
                const statement = `${value}$${offset} ${operator}`
                statements.push(statement)
                params.push(param)
                offset++
            }

            this._statement.push( `WHERE ${statements.join(' ')}`)
            this._params.push(...params)
        }
    }
})()