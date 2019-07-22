export default (function(){
    return {
        name: 'all',
        constructor: function(...args){
            const [ methodName ] = args
            this._statement[methodName] = { statement: '*' , params: [] }
        }
    }
})()