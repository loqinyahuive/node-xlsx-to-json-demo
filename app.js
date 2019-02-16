const express = require('express')

var xlsx = require('node-xlsx')

var sheets = xlsx.parse('2.xlsx');//获取到所有sheets

console.log('***** sheets', JSON.stringify(sheets));
sheets.forEach(function (sheet) {
  // console.log(sheet);
  for (var rowId in sheet['data']) {
    // console.log(rowId);
    var row = sheet['data'][rowId];
    // console.log(row);
  }

});

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

app.get("/sheets", function (req, res) {
  res.json({ result: sheets });
});

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))