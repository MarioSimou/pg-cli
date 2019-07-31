import { STATEMENTS } from '../../constants'  

export default (function(){
    return {
        name: STATEMENTS.WHERE,
        constructor: function(columns){
            const [column] = columns
            const params = column._params
            const values = column._values
            const n = column._params.length
            const m = column._values.length
            const nIterations = n > m ? n : m
            const statements = []
            // clears the stacks
            column._values = [], column._params = []

            for( let i=0; i < nIterations; i++){
                const value = values[i]
                // if a value does not exist, skip the iteration
                if( !value ) continue

                // if the last character of value is = 
                switch(value.slice(-1)){
                  case '=':
                  case '<':
                  case '>':
                  case '<=':
                  case '>=':
                  case '~':
                  case '*':
                      statements.push( value + '$' )
                      break;
                  default:
                      statements.push(value)
                } 
            }           

            return [ `WHERE ${statements.join(' ')}` , params ]
        }
    }
})()