export default (function(){
    return {
        name: 'set',
        constructor: function(...args){
            const [ methodName, ...inputs ] = args
            const selectionSet = this._selectionSet
            const statement = [], params = []

            for(let i=0; i < selectionSet.length; i++){
                const colName = selectionSet[i] 
                statement.push(`${colName}=$${i+1}`)
                params.push(inputs[i][1])
            }

            this._statement[methodName] = { statement : `SET ${statement.join(',')}` , params: params }
        }
    }
})()