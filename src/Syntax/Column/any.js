import { STATEMENTS } from '../../constants'
import { Response } from '../../index' 

export default (function(){
    return {
        name: STATEMENTS.ANY,
        constructor: function(...args){
            const isResponse = args.every( arg => arg instanceof Response )

            switch( isResponse ){
                case true:
                    this._values.push( args[0].toArray()[0] )
                    this._params.push( args[0].toArray()[1])
                    return
                default:
                    const statement = []
                    for(let arg of args){
                        statement.push(`$${this._params.length+1}`)
                        this._params.push(arg)                        
                    }

                    this._values.push(`${ this._fullColName } ANY(${statement.join(',')})`)
                    break;
            }
        }
    }
})()