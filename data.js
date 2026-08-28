
  const fs = require("fs")

  const loadInfo = () => {
     try {
        const dataJson = fs.readFileSync("data.json").toString()
        return JSON.parse(dataJson)   
     }
     catch {
        return []                    
     }
  }

//////////////////////////////////////////////////////////////////////

  const saveData = (allData) => {
     const allDataJson = JSON.stringify(allData)  
     fs.writeFileSync("data.json" , allDataJson)
  }

//////////////////////////////////////////////////////////////////////

  const addPerson = (id , fname , lname , age , city) => {
     const allData = loadInfo()

     const duplicatedData = allData.filter((obj) => {
        return obj.id === id
     })

     if (duplicatedData.length == 0) {
        allData.push({
           id : id,
           fname : fname,
           lname : lname,
           age : age,
           city : city
        })
        saveData(allData)
        console.log("PERSON ADDED")
     } else {
        console.log("ERROR DUPLICATED ID")
     }
  }

//////////////////////////////////////////////////////////////////////

  const listData = () => {
     const allData = loadInfo()

     allData.forEach((obj) => {
        console.log(`ID: ${obj.id} | Name: ${obj.fname} ${obj.lname} | Age: ${obj.age} | City: ${obj.city}`)
     })
  }

//////////////////////////////////////////////////////////////////////

  const readData = (id) => {
     const allData = loadInfo()

     const itemNeeded = allData.find((obj) => {
        return obj.id == id
     })

     if (itemNeeded) {
        console.log(itemNeeded)
     } else {
        console.log("ID NOT FOUND")
     }
  }

//////////////////////////////////////////////////////////////////////

  const deleteData = (id) => {
     const allData = loadInfo()

     const dataToKeep = allData.filter((obj) => {
        return obj.id !== id
     })

     saveData(dataToKeep)
     console.log("PERSON DELETED")
  }

//////////////////////////////////////////////////////////////////////

  const deleteAllData = () => {
     saveData([])              
     console.log("ALL PEOPLE DELETED")
  }

//////////////////////////////////////////////////////////////////////

  const fullNameAndCity = () => {
     const allData = loadInfo()

     allData.forEach((obj) => {
        console.log(`${obj.fname} ${obj.lname} - ${obj.city}`)
     })
  }

  module.exports = {
     addPerson,
     listData,
     readData,
     deleteData,
     deleteAllData,
     fullNameAndCity
  }