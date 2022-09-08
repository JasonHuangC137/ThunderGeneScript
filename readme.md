Thunder Gene is a easy to use custodium wallet system, with web-based GUI, however the chain can't store any personal or privet data due to legal consideration, this tool will help to create a snapshot (state of the contract) with all the personal data needed for any perpose. 

how to use this tool 

1. Go to your ThunderGene pannel and create project, and get the project id and secret for authrosiing all the action for this tool
2. Paste your secret and project id in ./dbmod/secret.js
3. For any transaction (including mint) you would include a asset id, this apply for both NFT and FT
4. Include a asset id and you can create user and do all sort of transaction for the token
5. Check the result at the udb.JSON, that's the snapshot 
6. You can modify the schema for the snapshot to better suit your needs in the jsdb.js file.


Function Illistration 
addUser(uid:int) : given uid, it will add a UID to the udb.JSON, which is the snapshot

mintToUser (c_id:str,token_id:int,uid:int) : given uid, it will add the according asset id and the token numer to the uid, user. If usr does not exist, it will create a new one for it.

getUser (uid:int) : Return user detail, such as address and collection holdings 
getUserAddress (uid:uid) : Retrun the user's address, if uid doesn't exist, it will retrun string "fail"
