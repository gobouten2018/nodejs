var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
// sample.csvはjsと同じ階層におく
const file = 'sample.csv';
console.log("file:" + file);
console.log("__dirname:" + __dirname);
const fpath = path.join(__dirname, "sample.csv"); 
// 関数定義。read_csv
let promiss_read_csv = () =>{
  return new Promise(
    (resolve, reject) => {
        // const data  = fs.readFileSync(path.join(__dirname, "sample.csv"), {encoding: "utf8"}); 
      // const data  = fs.readFileSync(fpath, {encoding: "utf8"});
      // const data  = fs.readFile(fpath, {encoding: "utf8"});
      // console.log(data);
      // index.js:9
      // "101","test1",1,"AAA1"
      // "102","test2",2,"BBB2"
      // "103","test3",3,"CCC3"
      var parse = require('csv-parse');
      console.log("parse read ");
      var csvData=[];
      var csvDataArr=[];
      let resJson = {};
      // fs.createReadStream(req.file.path)
      let result_list = [];
      // fs.readFile(fpath, function(err, data){
      fs.readFile(fpath, function(err, data){
        if (err) return console.log("err read data");
        console.log("read naiyou ");
        console.log("data:" + data); 
        parse(data, {
                      delimiter: ','
                    }, 
                    function(err, record){
                          if (err){
                            console.log(err); 
                            reject(err);
                            return; 
                          }
                          console.log(record);
                          for (let i =0; i<record.length; i++){
                            console.log("i:" + i);
                            console.log("record[i]:" + record[i]);
                            csvDataArr.push(record[i]);
                          }
                          csvData.push(record[0]);
                          console.log("csvData2:" + csvData);
                          console.log("csvDataArr:" + csvDataArr);
                          // resolve(csvDataArr);
                          // resolve(csvDataArr,{"te1":1},{"te":2});
                          resJson["csvData"] = csvData;
                          resJson["csvDataArr"] = csvDataArr;
                          resJson["te1"] = 1;
                          resJson["te2"] = 2;
                          resolve(resJson);
                        });
                    console.log("csvData:" + csvData);
        });// fs.readFile end
      }// (resolve, reject)  end
  );// promise end
}; // promiss_read_csv end

let test2 = () => {
  return new Promise(
    (resolve, reject) => {  
      console.log("test2 called"); 
    }
  );// promise end
};


// 実行
promiss_read_csv()
  .then(
    function(res){
    // function(res,res2){
      console.log("ok");
      console.log("res:" + res);
      // console.log("res2:" + res2);
      // console.log("res[1]:" + res[1]);
      console.log("res['csvData']:" + res['csvData']);
      console.log("res['te1']:" + res['te1']);
      console.log("res['te2']:" + res['te2']);
      for(let key in res){
        if(res.hasOwnProperty(key)){
          console.log("key:" + key + "res['key']:" + res[key]);
        }
      }
 
    }
    ,function(err){
        console.log("err");
        console.log("err:" + err);
      }
    )
  .then(test2)
  .catch(function(err) {
    console.log("err:" + err);
  });



/*
fs.readFile(fpath)
    .pipe(parse({delimiter: ':'}))
    .on('data', function(csvrow) {
        console.log(csvrow);
        //do something with csvrow
        csvData.push(csvrow);        
    })
    .on('end',function() {
      //do something wiht csvData
      console.log(csvData);
    });
*/
/*
fs.createReadStream(fpath)
    .pipe(parse({delimiter: ':'}))
    .on('data', function(csvrow) {
        console.log(csvrow);
        //do something with csvrow
        csvData.push(csvrow);        
    })
    .on('end',function() {
      //do something wiht csvData
      console.log(csvData);
    });
*/


/*
var csvData = [];
var rs = null;
let dataRead = () => {
  try{
    rs = fs.createReadStream(file, "utf-8");
    rs.on('error', function (err) {
      console.error(err);
    });  
  }
  catch(err) {
    console.error(err);
  }
  var parser = csvParse({ delimiter: ',' });
  parser.on('data', function (data) {
      console.log(data);
  });
  parser.on('error', function (err) {
      console.error(err);
      process.exit(1);
  });

  rs.pipe(parser);



  // let res2 = csvSync(data);
  // console.log(res2);
};
dataRead();
*?


/* GET home page. */
router.get('/', function(req, res, next) {
  

  res.render('index', { title: 'ExpressIndex2' });
});

module.exports = router;
  