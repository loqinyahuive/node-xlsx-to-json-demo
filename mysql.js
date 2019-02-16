var connction = {};

connction.mysql = {

  host: "10.230.44.120",           //这是数据库的地址

  user: "ucmcadmin",                  //需要用户的名字

  password: "admin@ucmcdb",            //用户密码 ，如果你没有密码，直接双引号就是

  database: "flinksink"           //数据库名字

}                                //好了，这样我们就能连接数据库了

module.exports = connction;  //用module.exports暴露出这个接口，