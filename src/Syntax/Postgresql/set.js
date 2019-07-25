export default (function(){
    return {
        name: 'set',
        constructor: function(columns){
            const offset = this._params.length
            const statement = [], params = []
            const n = columns.length

            for(let i=0+offset; i < n+offset; i++){
                const column = columns[i]
                statement.push(`${column._values.pop()}$${i+1}`)
                params.push(column._params.pop())
            }

            this._params.push(...params)
            this._statement.push(`SET ${statement.join(',')}`)
        }
    }
})()