import { STATEMENTS } from '../../constants'
import { Response } from '../../index'

export default (function(){
    return {
        name: STATEMENTS.NOT_IN,
        constructor: function(...args){
            const nested = args.some( arg => arg.length === 2 ) 

            switch( nested ){
                case true:
                        var [ statement , params ] = args[0]
                        return [ `${this._fullColName } NOT IN(${statement})` , params ]
                    default:
                        var statement = new Array( args.length ).fill('$').join(',')
                        return [ `${ this._fullColName } NOT IN(${statement})` , args ]
            }   
        }
    }
})()