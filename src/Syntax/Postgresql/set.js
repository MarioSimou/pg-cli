export default (function(){
    return {
        name: 'set',
        constructor: function(args){
            const offset = this._params.length
            const statement = [], params = []
            const n = args.length

            for(let i=0+offset; i < n+offset; i++){
                const [ column , value ] = args[i]
                statement.push( `${column._initColName}=$${i+offset+1}`)
                params.push(value)
            }

            this._params.push(...params)
            this._statement.push(`SET ${statement.join(',')}`)
        }
    }
})()