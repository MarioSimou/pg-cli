import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.WHERE,
        constructor: function(columns){
            const [column] = columns
            const statements = []
            const n = column._values.length
            const regex = /(IN|BETWEEN|NOT|ANY|ALL)/

            for(let i=0; i < n; i++){
                const value = column._values[i]
                const param = column._params[i]
                const operator = column._operators[i] || ''
                   
                switch( regex.test(value)){
                    case true:
                        statements.push(value)
                        continue
                    default:
                        const statement = `${value}$${this._params.length+1} ${operator}`
                        statements.push( statement )
                        this._params.push(param)        
                }

            }

            // clears the stacks so they don't conflict with other values
            column._params = [], column._values = [] , column._operators = []

            this._statement.push( `WHERE ${statements.join(' ')}`)
        }
    }
})()