var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
  
 });

 router.get('/EC_PC', function(req, res ) {
  var db = req.conn; 
  db.query( 'SELECT * FROM data', 
  function(err, records) { 
  if (err) 
 console.log(err); 
  else 
 res.render('EC_PC', {D: records});
 console.log(records);
  });
 });

 router.get('/degress', function(req, res ) {
  
  var db = req.conn; 
  db.query( 'SELECT * FROM th', 
  function(err, records) { 
  if (err) 
 console.log(err); 
  else 
 res.render('degress', {C: records});
 console.log(records);
  });
 });

 

 router.get("/EC_PC/:DATA/:EC/:PH", function(req,res){
  var db = req.conn;
  var str= 'insert into '+req.params.DATA+'(EC,PH,time)values ('+ req.params.EC 
   +',' + req.params.PH+',now())';
   console.log(str);
   db.query( str, 
   function(err, records) { 
   if (err) throw err 
   res.send("POST method OK!\n Record:" + 
   JSON.stringify(req.params));
  } );
  });
  
  
  router.get('/degress/:data/:temp/:hum', function(req, res ) {
    var db = req.conn; 
    var str ='UPDATE '+req.params.data+' SET temp='+req.params.temp+',hum='+req.params.hum+' WHERE 1';
    
   db.query( str, 
   function(err, records) { 
   if (err) throw err 
   res.send("POST method OK!!!!!\n Record:" + 
   JSON.stringify(req.params));
  } );
  });

  router.get('/data', function(req, res ) {
    var db = req.conn; 
    db.query( 'SELECT * FROM ai', 
    function(err, records) { 
    if (err) 
   console.log(err); 
    else {
      switch (records[0].type) {

        case 'greenwrinkledlettucedegreeofgrowth25percent':
            db.query( 'SELECT * FROM ltjwg25', 
            function(err, records) { 
            if (err) 
              console.log(err); 
            else 
              res.render('data', {D: records});
              console.log(records);
          })
          break;

        case 'greenwrinkledlettucedegreeofgrowth75percent':
          db.query( 'SELECT * FROM ltjwg75', 
          function(err, records) { 
          if (err) 
            console.log(err); 
          else 
            res.render('data', {D: records});
            console.log(records);
        })
        break;

        case 'redoakleaflettucedegreeofgrowth25percent':
          db.query( 'SELECT * FROM zxmwg25', 
          function(err, records) { 
          if (err) 
            console.log(err); 
          else 
            res.render('data', {D: records});
            console.log(records);
        })
        break;


        case 'redoakleaflettucedegreeofgrowth75percent':
          db.query( 'SELECT * FROM zxmwg75', 
          function(err, records) { 
          if (err) 
            console.log(err); 
          else 
            res.render('data', {D: records});
            console.log(records);
        })
        break;

        default:
          break;
      }
      
    };
      
    });

    
   });
 
   router.get('/fanweb', function(req, res ) {
    var db = req.conn; 
    db.query( 'UPDATE `fan` SET `pos`='+"'HIGH'"+',`neg`='+"'LOW'"+' WHERE 1', 
    function(err, records) { 
    if (err) 
   console.log(err); 
   
    else 
   res.render('fanweb', {D: records});
   console.log(records);
    });
   });


   router.get('/fanweb2', function(req, res ) {
    var db = req.conn; 
    db.query( 'UPDATE `fan` SET `pos`='+"'LOW'"+',`neg`='+"'HIGH'"+' WHERE 1', 
    function(err, records) { 
    if (err) 
   console.log(err); 
   
    else 
   res.render('fanweb2', {D: records});
   console.log(records);
    });
   });


   router.get('/mweb', function(req, res ) {
    var db = req.conn; 
    db.query( 'UPDATE `moto` SET `motoc`='+"'on'"+' WHERE 1', 
    function(err, records) { 
    if (err) 
   console.log(err); 
   
    else 
   res.render('fanweb', {D: records});
   console.log(records);
    });
   });


   router.get('/mweb2', function(req, res ) {
    var db = req.conn; 
    db.query( 'UPDATE `moto` SET `motoc`='+"'off'"+' WHERE 1', 
    function(err, records) { 
    if (err) 
   console.log(err); 
   
    else 
   res.render('fanweb2', {D: records});
   console.log(records);
    });
   });



   
   router.get('/eprecord/:DATE/:DATE2', function(req, res ) {
    var db = req.conn; 
    var str= 'SELECT * FROM data where time >= "'+req.params.DATE+'" AND time <="'+req.params.DATE2+'"';
    
    console.log(str); 

    db.query( str, 
    function(err, records) { 
    if (err) 
   console.log(err); 
    else 
   res.render('eprecord', {D: records});
   console.log(records);
    });
   });



   
   router.get('/api/:MARK', function(req, res ) {
    var str =req.params.MARK+"";
   res.render('api', {D: str});
   
    });
  
       
   router.get('/ai/:ttype', function(req, res ) {
    var db = req.conn; 

    db.query( 'UPDATE `ai` SET `type`='+'"'+req.params.ttype+'"'+' WHERE 1', 
    function(err, records) { 
    if (err) 
   console.log(err); 
   
    else 
   res.render('data', {D: records});
   console.log(records);
    });
   });


module.exports = router;
