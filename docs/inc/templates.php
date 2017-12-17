<script type="text/x-template" id="topic-card">
  <div class="card language-card">
    <div class="card-content">
      <span class="card-title">{{topic.properties.name}}</span>
      <p>{{topic.properties.desc}}</p>
    </div>
    <div class="card-tabs">
      <ul class="tabs tabs-fixed-width">
        <li class="tab"><a class="active" :href="'#languages-' + index">Languages</a></li>
        <li class="tab"><a :href="'#frameworks-' + index">Frameworks</a></li>
      </ul>
    </div>
    <div class="card-content">
      <div :id="'languages-' + index">
        <language-list :languages="topic.languages"></language-list>
      </div>
      <div :id="'frameworks-' + index">
      </div>
    </div>
    <div class="card-action">
      <a href="#addLanguage" class="modal-trigger" v-on:click="c_addLang(topic.properties.name)">Add Language</a>
      <a href="#addFramework" class="modal-trigger right" v-on:click="c_addFrame(topic.properties.name)">Add Framework</a>
    </div>
  </div>
</script>

<script type="text/x-template" id="language-list">
  <ul class="language-collection collection">
    <li class="collection-item" v-for="lang in languages" v-if="findLanguage(lang)">
      <span class="title">{{findLanguage(lang).properties.name}}</span>
      <p>{{findLanguage(lang).properties.desc}}</p>
      <div v-if="findLanguage(lang).preprocessors.length">
        <language-list :languages="findLanguage(lang).preprocessors"></language-list>
      </div>
    </li>
  </ul>
</script>
