const customHeader =(req, res, next) =>{
    try{
         const apikey = req.headers.api_key
        // if(apikey == 'leifer01'){
            if(apikey){
            next()
         }else{
            res.status(403)
            res.send({error: "Api Key no es correcto"});
         }
    }catch(e){
         res.status(403)
         res.send({error: "Se rompio"});
    }

};


module.exports = customHeader;