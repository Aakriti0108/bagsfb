const user = require('../models/user')
const bcrypt = require('bcrypt');
var CryptoJS = require('crypto-js');

exports.signup = async(req,res)=>{
   
        
    try{
        const email = req.body.email;
        const password = req.body.password; 
    // console.log("data",req.body);
    // const random = Math.random();
    // console.log("random",random);
    function set(keys, value) {
        var key = CryptoJS.enc.Utf8.parse(keys);
        var iv = CryptoJS.enc.Utf8.parse(keys);
        var encrypted = CryptoJS.AES.encrypt(
          CryptoJS.enc.Utf8.parse(value.toString()),
          key,
          {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
          }
        );
      
        return encrypted.toString();
      }
    if(email == undefined || email.length === 0 || password == undefined || password.length === 0)
    {
    return res.status(400).json({err:"bad parameters . something is missing"})
    }
    // const saltrounds = 10;
    // bcrypt.hash(password,saltrounds, async (err,hash)=>{
        var encryptedRid = set('123456$#@$^@1ERF', password);

        let result = await user.details(email,encryptedRid);
        console.log(result,"result")
        res.status(201).json({success:true,data:result})
}
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

exports.login = async(req,res)=>{
   
   
    try{
       function get(keys, value) {
            var key = CryptoJS.enc.Utf8.parse(keys);
            var iv = CryptoJS.enc.Utf8.parse(keys);
            var decrypted = CryptoJS.AES.decrypt(value, key, {
              keySize: 128 / 8,
              iv: iv,
              mode: CryptoJS.mode.CBC,
              padding: CryptoJS.pad.Pkcs7,
            });
          
            return decrypted.toString(CryptoJS.enc.Utf8);
          }
        const email = req.body.email;
        const password = req.body.password; 
         console.log("data",req.body);
           
        let result = await user.entry(email);
        console.log(result.length);
        if(result.length == 1){
          const   routeRestaurantId = get('123456$#@$^@1ERF', result[0].password);
                 if(password === routeRestaurantId )
                 {
                    res.status(200).json({success:true,message:"user is succesfully logged"})
                 }
                 else{
                    return res.status(400).json({success:false , message:"Password is incorrect"})
                 }
    //         bcrypt.compare(password,result[0].password,(err,result)=>{
    //             if(err)
    //             {
    //                 res.status(500).json({success:false , message:"something went wrong"})
    //             }
    //             if(result == true)
    //             {
    //                 res.status(200).json({success:true , message:"user is successfully logged"})
    //             }
    //             else
    //             {
    //                 return res.status(400).json({success:false , message:"Password is incorrect"})
    //             }
    // })
    
}
    }
    catch(err){
        console.log(err);
        res.status(500).json(err);
    }
    }
