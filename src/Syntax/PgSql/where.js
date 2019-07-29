import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.WHERE,
        constructor: function(columns){
            const [column] = columns
            const n = column._params.length
            const m = column._values.length
            const l = this._params.length + 1
            const nIterations = n > m ? n : m
            const statements = []

            for( let i=0; i < nIterations; i++){
                const value = column._values[i]
                // if a value does not exist, skip the iteration
                if( !value ) continue

                // if the last character of value is = 
                if( /(=|<|>|<=|>=)/.test(value.slice(-1)) ){
                    const operator = column._operators[i] || ''
                    statements.push(`${ value }$${l+i} ${operator}`)
                } else {
                    statements.push(value)
                }
            }

            if(column._params.length)
                this._params.push( ...column._params )

            this._statement.push( `WHERE ${ statements.join(' ') }`)

            // clean the stacks
            column._values = [], column._params = [], column._operators
        }
    }
})()