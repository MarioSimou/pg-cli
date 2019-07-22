export default (function(){
    return {
        name: 'values',
        constructor: function(...args){
            const [ methodName , ...input ] = args
            const columns = Object.keys(input[0])
            const colSize = columns.length
            const colNames = `(${columns.join(',')})`
            const n = input.length
            const statement = []


            for(let i=0; i < n; i++){
                const values = Object.values(input[i])
                if(values.length !== colSize ) throw new Error('Inconstent values data structure')
                const s = `(${values.map( v => `'${v}'`).join(',')})`
                statement.push(s)
            }

            this._statement[methodName] = { statement : `${colNames} VALUES${statement.join(',')}` , params : [] }
        }
    }
})()