export default (function(){
    return {
        name: 'as',
        constructor: function(...args){
            const [ methodName , input ] = args
            const columnName = this._selectionSet.pop()
            this._selectionSet.push(`${ columnName } as ${input}`)
        }
    }
})()