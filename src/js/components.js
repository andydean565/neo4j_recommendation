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
