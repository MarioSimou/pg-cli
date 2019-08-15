import { STATEMENTS } from '../../utils/constants'
import { generateQueues } from '../../utils'

export default (function(){
    return {
        name : STATEMENTS.HAVING,
        constructor: function(columns){
            const [column] = columns
            const [ v , p , m ] = generateQueues( column , [] , [] , [] )
            const n = m.length;
            const statements = []

            for( let i=0; i < n; i++){
              const [ methodName , colName ] = m[i]
              const value = v[i]
              
              // if a value does not exist, skip the iteration
              if( !value ) continue

              // if the last character of value is =
              let prev;
              switch(methodName){
                case STATEMENTS.COUNT:
                case STATEMENTS.MIN:
                case STATEMENTS.MAX:
                case STATEMENTS.AVG:
                case STATEMENTS.SUM:
                  statements.push( value + '(' + colName + ')' )
                  break;
                case STATEMENTS.BETWEEN:
                  prev = statements.pop()
                  statements.push( prev + ' ' + value + ' $ AND $')
                  break;   
                case STATEMENTS.GT:
                case STATEMENTS.GTE:
                case STATEMENTS.LT:
                case STATEMENTS.LTE:
                case STATEMENTS.EQUAL:
                case STATEMENTS.UNEQUAL:
                  prev = statements.pop()
                  statements.push( prev + value + '$' )
                  break;
                case STATEMENTS.AND:
                case STATEMENTS.OR:
                  prev = statements.pop()
                  statements.push( value , prev  )
                  break;
                default:
                  prev = statements.pop()
                  statements.push( prev + ' ' + value )
                  break;
              } 
            }   

            return [ `HAVING ${statements.join(' ')}` , p ]
        }
    }
})()