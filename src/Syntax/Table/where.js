import { STATEMENTS } from '../../constants'  

const generateQueues = ( c , v , p , m ) => {
  v.push( ...Array.from( c._commands.values() ).reduce( ( s , command ) => [ ...s , ...command ] , []) )
  m.push( ...c._monitor.reduce( ( s , method ) => [ ...s , [ method , c._fullColName  ] ] , [])  )
  p.push( ...c._params )
  
  if( c._nestedColumn ) generateQueues( c._nestedColumn , v , p , m )
  c._flush()
  return [ v , p , m ]
}

export default (function(){
    return {
        name: STATEMENTS.WHERE,
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
                switch(methodName){
                case STATEMENTS.ALL:
                case STATEMENTS.ANY:
                case STATEMENTS.IN:
                case STATEMENTS.IS:
                case STATEMENTS.NOT:
                case STATEMENTS.NULL:
                  if(i == 0) statements.push( colName + ' ' + value  )
                  else statements.push( value )
                  break;
                case STATEMENTS.AND:
                case STATEMENTS.OR:
                  if( i === n-1 ) {
                    const prev = statements.pop()
                    statements.push( value + ' ' + prev )
                  } else {
                    statements.push( value )
                  }
                  break;
                case STATEMENTS.EQUAL:
                case STATEMENTS.UNEQUAL:
                case STATEMENTS.LT:
                case STATEMENTS.LTE:
                case STATEMENTS.GT:
                case STATEMENTS.GTE:
                case STATEMENTS.MATCH:
                case STATEMENTS.MATCHI:
                  statements.push( colName + value + '$' )
                  break;
                default:
                  statements.push( colName + value )
                  break;
                } 
            }           


            return [ `WHERE ${statements.join(' ')}` , p ]
        }
    }
})()