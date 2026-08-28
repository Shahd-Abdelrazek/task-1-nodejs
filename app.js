
  const yargs     = require("yargs")     
  const validator = require("validator")  
  const fs        = require("fs")         

  const data = require("./data")
  const command = process.argv[2] || "none"

  fs.appendFileSync("log.txt" , `command: ${command}\n`)


//////////////////////////////////////////////////////////////////////

  yargs.command({
     command : "add",
     describe : "to add a person",
     builder : {
        id    : { describe : "person id", demandOption : true, type : "string" },
        fname : { describe : "first name", demandOption : true, type : "string" },
        lname : { describe : "last name",  demandOption : true, type : "string" },
        age   : { describe : "age",        demandOption : true, type : "string" },
        city  : { describe : "city",       demandOption : true, type : "string" }
     },
     handler : (x) => {
        if (!validator.isInt(x.age)) {
           console.log("ERROR : age must be a number")
           return
        }
        data.addPerson(x.id , x.fname , x.lname , x.age , x.city)
     }
  })

//////////////////////////////////////////////////////////////////////

  yargs.command({
     command : "list",
     describe : "to list all people",
     handler : () => {
        data.listData()
     }
  })

//////////////////////////////////////////////////////////////////////

  yargs.command({
     command : "read",
     describe : "to read one person by id",
     builder : {
        id : { describe : "person id", demandOption : true, type : "string" }
     },
     handler : (x) => {
        data.readData(x.id)
     }
  })

//////////////////////////////////////////////////////////////////////

  yargs.command({
     command : "delete",
     describe : "to delete one person by id",
     builder : {
        id : { describe : "person id", demandOption : true, type : "string" }
     },
     handler : (x) => {
        data.deleteData(x.id)
     }
  })

//////////////////////////////////////////////////////////////////////

  yargs.command({
     command : "delete-all",
     describe : "to delete all people",
     handler : () => {
        data.deleteAllData()
     }
  })

//////////////////////////////////////////////////////////////////////

  yargs.command({
     command : "fullname",
     describe : "to view full name + city for each person",
     handler : () => {
        data.fullNameAndCity()
     }
  })

//////////////////////////////////////////////////////////////////////

  yargs.parse()