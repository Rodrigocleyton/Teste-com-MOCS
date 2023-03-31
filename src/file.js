const  { readFile } = require('fs/promises')
const { error } = require('./constants')
const DEFAULT_OPTION = {
  //caso a regra de negócios mude, só será necessário alterar aqui
  maxLines: 3,
  fields: ['id','name','profession','age']
}

class File {
  static async csvToJSON (filePath) {
      const content = await readFile(filePath, "utf8")
      //console.log({ content })
     const validation = this.isValid(content)
     if(!validation.valid) throw new Error(validation.error)

     const result = this.parserCSVToJSON(content)
     return result
    }
    static isValid (csvString, options = DEFAULT_OPTION) {
       const [header, ...fileWhithoutHeader] = csvString.split(/\r?\n/)  //exepressão regular. diz que pode ser 'r' ou 'n'. vai quebrar o arquivo em cada linha do array
       const isHeadersValid = header === options.fields.join(',')
       if (!isHeadersValid) {
        return {
          error: error.FILE_FIELDS_ERROR_MESSAGE,
          valid:false

        }

       }
       
       if(
          !fileWhithoutHeader.length ||
          fileWhithoutHeader.length > options.maxLines
          ) {
        return {
          error: error.FILE_LENGTH_ERROR_MESSAGE,
          valid:false
        }

       }
       
      //console.log(header, fileWhithoutHeader)
      return {valid: true}
    }

    static parserCSVToJSON(csvString) {
      const lines = csvString.split(/\r?\n/)
      const firstLine = lines.shift()
      const header = firstLine.split(',')
      console.log({header})
    }
    
}


module.exports = File