const {error} = require('./src/constants')
const File = require('./src/file')
const assert = require('assert')
//função que executa sozinho
;(async ()=>{
    //tudo que for criado dentro dessas chaves morrerá após a execução
    {
        const filePath = './mocks/emptyFile-invalid.csv'
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJSON(filePath)
        await assert.rejects(result, expected)

    }

    {
        
        const filePath = './mocks/invalid-Header.csv'
        const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
        const result = File.csvToJSON(filePath)
        await assert.rejects(result, expected)
        
    }



    {
        
        const filePath = './mocks/fiveItens-invalid.csv'
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJSON(filePath)
        await assert.rejects(result, expected)
        
    }

/*
    {
        
        const filePath = './mocks/threeItens-valid.csv'
        const expected = [ 
            {
                id: 1,
                name: "rodrigo",
                profession: "backend",
                age:41

            },
            {
                id: 2,
                name: "cleyton",
                profession: "frontend",
                age:40

            },
            {
                id: 3,
                name: "oliveira",
                profession: "fullstack",
                age:43

            },
        ]
        const result = await File.csvToJSON(filePath)
        assert.deepEqual(result, expected)
        
    }
    */
})()