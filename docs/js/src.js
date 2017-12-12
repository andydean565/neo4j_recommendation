$(document).ready(function(){
   $('.modal').modal();
   $('.collapsible').collapsible();
   Materialize.updateTextFields();
 });

Vue.component('app-nav', {
  props: {
    logo: {type: String},
    nav: {type: Array}
  }
});

Vue.component('topic-card', {
  props: {
    topic: {type: Object},
    index: {type: Number}
  },
  template : "#topic-card",
  methods: {
    update: function (value) {
      this.$emit('input', value)
    }
  }
});

Vue.component('language-tab', {
  props: {
    languages: {type: Array},
    topic: {type: String},
    index: {type: Number}
  },
  template : "#language-tab",
  methods: {
    update: function (value) {
      this.$emit('input', value)
    }
  }
});

Vue.component('list', {
  props: ['text'],
  template: '<div class="row valign-wrapper"><div class="col s6 item">{{ text }}</div><div class="col s6 item"><button class="btn-floating" v-on:click="$emit(\'remove\')"><i class="material-icons">clear</i></button></div></div>'}
)

var app = new Vue({
  el: '#app',
  data: {
    config :{
      ser:{protocol:'http://',host:'127.0.0.1',port: 1337},
      codes:{success:1,db:2,ser:3,null:4}
    },
    logo: 'Learning',
    nav: [
      {text:"Add Language", class:"modal-trigger", href:"#addLanguage"},
      {text:"Add Framework", class:"modal-trigger", href:"#addFrame"},
      {text:"Add Topic", class:"modal-trigger", href:"#addTopic"}
    ],
    languages:[],
    adding : {
      lang: {name: null, desc : null, topic: null, framework:null, preprocessor:'',preprocessors:[], preActive: false},
      topic: {name: null, desc : null},
    },
    frameworks:[],
    topics:[],
    //editing
  },
  created : function(){
    this.getTopics();
    this.getFrameworks();
    this.getLanguages();
  },
  methods : {
    //gets
    getTopics: function(){
      this.$http.get(this.createUrl('Topics')).then(response => {
        if(this.errorCheck(response)){this.topics = response.body;}
        else{console.log('data error : ' + response);}
      }, response => {}).bind(this);
    },
    getFrameworks: function(){
      this.$http.get(this.createUrl('Frameworks')).then(response => {
        if(this.errorCheck(response)){this.frameworks = response.body;}
        else{console.log('data error : ' + response);}
      }, response => {}).bind(this);
    },
    getLanguages: function(){
      this.$http.get(this.createUrl('Languages')).then(response => {
        if(this.errorCheck(response)){this.languages = response.body;}
        else{console.log('data error : ' + response);}
      }, response => {}).bind(this);
    },
    addLanguage: function (form){
      if(this.adding.lang.name == null || this.adding.lang.name == null){return false;}
      var lang = this.adding.lang;
      this.$http.post(this.createUrl('addLanguage'), lang).then(response => {
        console.log(response);
        if(this.errorCheck(response.body)){
          this.languages.push(this.adding.lang);
        }
        else{console.log('data error : ' + response);}
      }, response => {}).bind(this);
    },
    addTopic: function (form){
      if(this.adding.topic.name == null || this.adding.topic.name == null){return false;}
      var topic = this.adding.topic;
      this.$http.post(this.createUrl('addTopic'), topic).then(response => {
        console.log(response);
        if(this.errorCheck(response.body)){
          this.topics.push(this.adding.topic);
        }
        else{console.log('data error : ' + response);}
      }, response => {}).bind(this);
    },
    //general
    errorCheck: function(error){
      switch (error) {
        case this.config.codes.success: return true; break;
        case this.config.codes.db: return false; break;
        case this.config.codes.ser: return false; break;
        case this.config.codes.null: return false; break;
        default: return true;
      }
    },
    createUrl: function(page){
      var host = this.config.ser.protocol + this.config.ser.host + ":" + this.config.ser.port;
      var url = host + "/" + page;
      return url;
    },
    addToPreProcessors: function () {
      console.log(this.adding.lang.preprocessor);
      var preprocessor = {}
      preprocessor.name = this.adding.lang.preprocessor;
      if(preprocessor.name != ""){
        this.adding.lang.preprocessors.push(preprocessor);
        this.adding.lang.preprocessor = '';
      }
    },
    togglePre: function () {
      this.adding.lang.preActive = !this.adding.lang.preActive;
      if(!this.adding.lang.preActive){this.adding.lang.preprocessors = [];}
    }
  }
})
