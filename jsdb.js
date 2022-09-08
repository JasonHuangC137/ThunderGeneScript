const { fail } = require('assert');
const { Console } = require('console');
const fs = require('fs');
const { userInfo } = require('os');
const { stringify } = require('querystring');


var addUser = (uid,add=null) =>{  // add if else to see if append or adad 
    var db = fs.readFileSync('./udb.json','utf8')
    var data = JSON.parse(db)
    if (data[uid]==undefined){
        data[uid]={
            'address':add,
            "collections" : {}
        }
        fs.writeFileSync('./udb.json',JSON.stringify(data,null,4))
        console.log('Successfully Write Data: ', uid, " / ",add,' into Database!')
    }else {
        console.log("UID exisitd: ",uid)
    }
}

function getUser (uid) {
    var db = fs.readFileSync('./udb.json','utf8')
    var data = JSON.parse(db)
    console.log('UserID: ',uid,data[uid])
}

function getUserAddress (uid){
    var db = fs.readFileSync('./udb.json','utf8')
    var data = JSON.parse(db)
    if (data[uid]==undefined){
        console.log('No Such UID:',uid)
        return "fail"
    }else{
        return data[uid]['address']
    }
}

function addNFT (collectionId,token_id,uid){
    var db = fs.readFileSync('./udb.json','utf8')
    var data = JSON.parse(db)
    if (data[uid]==undefined){
        console.log('No Such UID:',uid)
        return 'null'
    }else{
        data[uid]["collections"][collectionId]=token_id
    }
    fs.writeFileSync('./udb.json',JSON.stringify(data,null,4))
    console.log('token id :',token_id,' mint to: ', uid , 'SnapShot Updated!')
}







// addUser(12342,"023423400")
// addUser(666,"023423400")
//getUser(666)


// module.exports.getUser = getUser()
    
// module.exports.addUser = addUser()
module.exports.getUser = getUser
module.exports.addUser= addUser
module.exports.addNFT = addNFT
module.exports.getUserAddress = getUserAddress