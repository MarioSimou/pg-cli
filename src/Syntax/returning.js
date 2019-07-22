export default (function(){
    return {
        name: 'returning',
        constructor: function(...args){
            const [ methodName ] = args
            this._statement[methodName] = { statement: 'RETURNING' , params: [] }
        }
    }
})()