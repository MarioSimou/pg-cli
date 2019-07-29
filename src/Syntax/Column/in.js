import { STATEMENTS } from '../../constants'
import { Response } from '../../index'

export default (function(){
    return {
        name: STATEMENTS.IN,
        constructor: function(...args){
            const isResponse = args.every( arg => arg instanceof Response )

            switch( isResponse ){
                case true:
                    var [ statement , params ] = args[0].toArray()
                    if( statement )
                        this._values.push( `${this._fullColName } IN(${statement})`)
                    if( params.length )
                        this._params.push(...params)
                    return
                default:
                    const n = this._params.length + 1
                    var statement = args.map( ( _ , i ) => `$${n+i}`).join(',')

                    this._params.push(...args)                        
                    this._values.push(`${ this._fullColName } IN(${statement})`)
                    break;
            }           
        }
    }
})()