var crypt = require('../crypt');
var { mongoose } = require('../db/mongoose');
var { UserProfile} = require('../models/UserProfile')

// for graph
var session = require('express-session')
const neo4j = require('neo4j-driver').v1;
const driver = neo4j.driver('bolt://ec2-3-17-8-206.us-east-2.compute.amazonaws.com:7687', neo4j.auth.basic('neo4j', '12345678'));
// graph end

    function handle_request(msg, callback){
        
        console.log("In handle request:"+ JSON.stringify(msg));


         // I have sent request to these emails
                // graph start
                console.log(' My email : ', msg.user_email)
                 session = driver.session();
                // sent
                var data = []
                var resultPromise = session.run(
                    'match(n:User {email: $send}),(d:User) where (n)-[:sent]->(d) return (d)',
                       {send : msg.user_email } 
                )
                 resultPromise.then(result1 => {
                    session.close();
                     console.log()
                    var array = result1.records
                    var count=array.length
                    for(var i = 0 ; i < array.length; i++){
                        console.log(array[i].get(0).properties)
                        data.push(array[i].get(0).properties)
                    }
                    console.log(data)
                    var details={data:data,count:count}
                    callback(null,details)
                        
                    driver.close();
                })
                // graph end
    }
exports.handle_request = handle_request;            

        /*
        UserProfile.find({
            email:msg.user_email 
        },{_id:0,'requests.sendrequest':1}, function (err, result) {
            if (err) {
                console.log(err);
                callback(err,[]);
            } else {

                console.log(result[0].requests.sendrequest)
                callback(null,result[0].requests.sendrequest);
            
            }

        */
             //   k=[]
               // k=k.concat(result[0].requests.sendrequest)
              //  for(a in result){
             // console.log(result[a].email)
                 //   k.push(result[a].email)
               // }
               //console.log(k)
                /*PeopleConnect.find({$and:[{email:{$nin:k }},{email:{$ne:msg.email }}]
                   },{_id:0,email:1}, function (err, result) {
                       if (err) {
                           console.log(err);
                           callback(err,[]);
                       } else {*/
                         
          
               // callback(null,result);
    
            
        //})  
        /*     console.log("In handle request:"+ JSON.stringify(msg));
        PeopleConnect.updateOne({
         email:msg.user_email   
        },{$push:{'requests.connectionlistlist':msg.connection_email}}, function (err, result) {
            if (err) {
                console.log(err);
                callback(err,[]);
            } else {
                console.log(result)
                PeopleConnect.updateOne({
                    email:msg.connection_email   
                   },{$push:{'requests.connectionlistlist':msg.user_email}}, function (err, result) {
                       if (err) {
                           console.log(err);
                           callback(err,[]);
                       } else {
                           console.log(result)
                           callback(null,result);
               
                       }
                   })
    
            }
        })
*/
    //}

