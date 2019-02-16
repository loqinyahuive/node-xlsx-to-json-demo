const express = require('express')

const xlsx = require('xlsx')

const workbook = xlsx.readFile('./1.xlsx', { type: 'UTF-8' })
var data =xlsx.utils.sheet_to_json(workbook);
console.log('*********** workboot', JSON.stringify(workbook));
// JSON.stringify(workbook)
// var dataa =xl.utils.sheet_to_json(worksheet);

// const sheetNames = workbook.SheetNames

// const sheetTab = workbook.Sheets[sheetNames[0]]

// const sheetJson = xlsx.utils.sheet_to_json(sheetTab)

// sheetJson.forEach(item => {
//     console.log(item)
// })

// var xlsx = require('node-xlsx')

// var sheets = xlsx.parse('1.xls');//获取到所有sheets

// sheets.forEach(function (sheet) {
//   console.log(sheet);
//   // for (var rowId in sheet['data']) {
//   //   console.log(rowId);
//   //   var row = sheet['data'][rowId];
//   //   console.log(row);
//   // }

// });
// var iconv = require('iconv-lite');
// var fs = require('fs');
// fs.readFile('1.xml', 'utf-8', (err, data) =>{
//   if (err) throw err;
//   var str = iconv.decode(data, 'utf-8');
//   // console.log('********** str', str);
// });
// var buf = new Buffer(fileStr, 'binary');
// var str = iconv.decode(buf, 'GBK');

// console.log(str);
// fs.readFile('./1.xls', "utf8", function (err, data) {
//   if (err)
//     console.log("读取文件fail " + err);
//   else {
//     // 读取成功时  
//     console.log(data);// 直接输出中文字符串了  
//   }
// });

var $mysql = require("mysql");
var sql = require("./mysql");
var $sql = $mysql.createConnection(sql.mysql);
$sql.connect();
const app = express();
// 解决跨域问题
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});
var list = [];
var select = "SELECT * from t_its_vehicle_unload_progress"   //假设我们数据表叫mono  *代表查询全部内容  select查询

$sql.query(select, function (err, r) {   //err提示错误信息  res是查询到的内容全在里面

  if (err) {
    console.log("错误", err)//我们打印出，错误信息  

  } else {
    list = r;
    console.log('******* res', r.length)      //打印出我们查询的内容

  }
})
app.get("/list", function (req, res) {
  res.json({ result: list });
});

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))