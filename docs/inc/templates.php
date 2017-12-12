<script type="text/x-template" id="topic-card">
  <div class="card">
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
      <div :id="'languages-' + index">languages</div>
      <div :id="'frameworks-' + index">frameworks</div>
    </div>
    <div class="card-action">
      <a href="#addLanguage" class="modal-trigger" v-on:click="update(topic.properties.name)">Add Language</a>
      <a href="#addFramework" class="modal-trigger right">Add Framework</a>
    </div>
  </div>
</script>
