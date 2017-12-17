//------------REQUIRES------------//
var neo4j = require('neo4j');

var $ = require('jquery');

var express = require('express'),
    http = require('http'),
    ejs = require('ejs'),
    bodyParser = require('body-parser'),
    cors = require('cors');

//------------VARS------------//

var app = express();

var config ={
  web:{host:'0.0.0.0',port: 1337},
  db:{username:"neo4j",password:"neo4j",protocol : "http://",host:"localhost",port:7474},
  codes:{success:1,db:2,ser:3,null:4}
};

var db = new neo4j.GraphDatabase(config.db.protocol + config.db.username + ":" + config.db.password + "@" + config.db.host + ":" + config.db.port);

//------ APP ------//

app.engine('html', ejs.renderFile);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '../view'));

//------------------HEADER------------------//

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

//------------------DATA------------------//

//------------------GET------------------//

app.get('/Topics', function (req, res) {
  db.cypher({query: 'MATCH (t:Topic) RETURN t'},
  function (err, results) {
    var topics = [];
    if(err){throw err;}
    results.forEach(function(topic){topics.push(topic['t']);});
    res.json(topics);
  });
});

app.get('/Frameworks', function (req, res) {
  db.cypher({query: 'MATCH (f:Framework) RETURN f'},
  function (err, results) {
    var frameworks = [];
    if(err){throw err;}
    results.forEach(function(framework){frameworks.push(framework['f']);});
    res.json(frameworks);
  });
});

app.get('/Languages', function (req, res) {
  var match = "MATCH (l:Language)-[:PRE]->(p:Language) "
  var optional = "OPTIONAL MATCH (l)-[:IN]->(t:Topic), (l)<-[:USED]-(f:Framework) "
  var back = "RETURN l as lang, collect(t.name) as topic, f.name as framework, collect(p.name) as pre";
  db.cypher({query: (match + optional + back)},
  function (err, results) {
    var languages = [];
    if(err){throw err;}
    results.forEach(function(language){
      var tmp = language['lang'];
      tmp.topic = language['topic'];
      tmp.framwork = language['framework'];
      tmp.preprocessors = language['pre'];
      languages.push(tmp);
    });
    res.json(languages);
  });
});

//------------------ADD------------------//

app.post('/addLanguage', function (req, res) {
  var language=req.body,match="MATCH ",create="CREATE",rel="",back="RETURN l",params={};

  create += "(l:Language{name:{lang_name},desc:{lang_desc}})";
  params.lang_name = language.name;
  params.lang_desc = language.desc;

  if(language.topic){
    match += "(t:Topic{name:{topic}})";
    rel += ", (t)<-[:IN]-(l)";
    params.topic = language.topic;
  }
  if(language.framework){
    match += ", (f:Framework{name:{framework}})";
    rel += ", (f)<-[:IN]-(l)";
    params.framework = language.framework;
  }
  if(language.preprocessors){
    var p_create = "", p_rel= "";
    language.preprocessors.forEach(function(pre, index) {
      p_create += ", (p" + index + ":Language{name: {pre" + index + "}})";
      p_rel += ", (p" + index + ")<-[:PRE]-(l)";
      params['pre' + index] = pre;
    });
    create += p_create;
    rel += p_rel;

    var statement = match + create + rel + back;
    console.log(statement);

    db.cypher({query: statement, params : params},
    function (err, results) {
      if(err){throw err;}
      res.json(config.codes.sucess);
    });
  }
});

//------------------ERRORS------------------//

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.json(config.codes.ser);
  res.status(500).send('Something bad happened!');
});

//------------------START------------------//

app.listen(config.web.port, config.web.host);
console.log('Server running on http://%s:%s', config.web.port, config.web.host);
module.exports = app ;
