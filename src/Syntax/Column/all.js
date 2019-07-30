import { STATEMENTS } from '../../constants'

export default (function(){
    return {
        name: STATEMENTS.ALL,
        constructor: function(...args){
            const nested = args.some( arg => arg.length === 2 ) 

            switch( nested ){
                case true:
                    var [ statement , params ] = args[0]
                    if( statement )
                        this._values.push( `${this._fullColName } ALL(${statement})`)
                    if( params.length )
                        this._params.push(...params)
                    break;
                default:
                    var statement = new Array( args.length ).fill('$').join(',')

                    this._params.push(...args)                        
                    this._values.push(`${ this._fullColName } ALL(${statement})`)
                    break;
            }          
        }
    }
})()