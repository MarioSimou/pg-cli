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
                    if( statement )
                        this._values.push( `${this._fullColName } NOT IN(${statement})`)
                    if( params.length )
                        this._params.push(...params)
                    break;
                default:
                    var statement = new Array( args.length ).fill('$').join(',')

                    this._params.push(...args)                        
                    this._values.push(`${ this._fullColName } NOT IN(${statement})`)
                    break;
            }  
        }
    }
})()