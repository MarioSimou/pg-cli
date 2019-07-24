export default (function(){
    return {
        name: 'where',
        constructor: function(...args){
            const [ methodName , input ] = args

            // hadnle input postgresql object

            this._statement[methodName] = { statement : null , parameters : [] }
        }
    }
})()