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
    c_addLang: function (value) {this.$emit('input:lang_topic', value)},
    c_addFrame: function (value) {this.$emit('update:lang_framework', value)},
    findLanguage: function (prop,lang,index) {
      var l = this.$root.findLanguage(prop,lang,index);
      console.log(l);
      return l;
    }
  },
  mounted: function () {
  }
});

Vue.component('language-list', {
  props: {
    languages: {type: Array},
    language: {type: Object}
  },
  template : "#language-list",
  methods: {
    findLanguage: function (lang) {
      var l = this.$root.findLanguage('name',lang,false);
      if(l){
        return l;
      }else{return false;}
    }
  },
  mounted: function () {
  }
});

Vue.component('pre-list', {
  props: ['text'],
  template: '<div class="row valign-wrapper"><div class="col s6 item">{{ text }}</div><div class="col s6 item"><button class="btn-floating" v-on:click="$emit(\'remove\')"><i class="material-icons">clear</i></button></div></div>'}
)
