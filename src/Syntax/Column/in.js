import { STATEMENTS } from '../../constants'

export default (function(){
    return {
        name: STATEMENTS.IN,
        constructor: function(...args){
            const nested = args.some( arg => arg.length === 2 )
            const hasValues = this._values.length ? '' : this._fullColName 

            switch( nested ){
                case true:
                        var [ statement , params ] = args[0]
                        return [ hasValues ? `${hasValues} IN(${statement})` : `IN(${statement})` , params ]
                    default:
                        var statement = new Array( args.length ).fill('$').join(',')
                        return [ hasValues ? `${hasValues} IN(${statement})` : `IN(${statement})` , args ]
            }           
        }
    }
})()