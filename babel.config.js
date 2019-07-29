module.exports = {
    presets : [
        [ 
            "@babel/preset-env" , 
            {
                targets : {
                    node: 'current',
                    esmodules: true
                }
            }
        ]
    ],
    "sourceMaps": "inline",
    "retainLines": true
}