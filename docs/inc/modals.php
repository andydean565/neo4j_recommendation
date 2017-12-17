<form id="addLanguage" class="modal" name="addLanguage" enctype="multipart/form-data" class="modal-content" v-on:submit.prevent="addLanguage">
  <div class="modal-content">
    <h4>Add Language</h4>
    <div v-if="adding.lang.topic != null" class="row">
      <div class="input-field col s12">
        <input disabled name="topic" type="text" value=" n/a" v-bind:value="adding.lang.topic" class="validate">
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <input v-model="adding.lang.name" name="name" type="text" class="validate">
        <label for="name">Name</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <textarea v-model="adding.lang.desc" class="materialize-textarea"></textarea>
        <label for="name">Description</label>
      </div>
    </div>
    <ul class="row collapsible form-optional" data-collapsible="accordion">
      <li>
        <div class="collapsible-header right" v-on:click="togglePre"><div v-if="!adding.lang.preActive" class="closed">Add Pre Processors</div><div v-else class="open">close</div></div>
        <div class="collapsible-body">
          <div class="row">
            <div class="col no-gutter">
              <h5>Pre Processors</h5>
            </div>
          </div>
          <div class="row">
            <div class="col s6 no-gutter">
              <input v-model="adding.lang.preprocessor" placeholder="Add Pre Processors">
            </div>
            <div class="col s2 no-gutter">
              <a href="#" class="btn-floating" v-on:click="addToPreProcessors"><i class="material-icons">add</i></a>
            </div>
          </div>
          <list v-for="(preprocessor, index) in adding.lang.preprocessors" v-bind:text="preprocessor.name" v-on:remove="adding.lang.preprocessors.splice(index, 1)"></list>
        </div>
      </li>
    </ul>
  </div>
  <div class="modal-footer">
    <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat left">Cancel</a>
    <input class="waves-effect waves-light btn" type="submit" value="Add Language">
  </div>
</form>



<form id="addTopic" class="modal" name="addTopic" enctype="multipart/form-data" class="modal-content" v-on:submit.prevent="addTopic">
  <div class="modal-content">
    <h4>Add Topic</h4>
    <div class="row">
      <div class="input-field col s12">
        <input v-model="adding.topic.name" id="l_name" type="text" class="validate">
        <label for="l_name">Name</label>
      </div>
    </div>
    <div class="row">
      <div class="input-field col s12">
        <textarea v-model="adding.topic.desc" id="l_desc" class="materialize-textarea"></textarea>
        <label for="l_desc">Description</label>
      </div>
    </div>
  </div>
  <div class="modal-footer">
    <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat left">Cancel</a>
    <input class="waves-effect waves-green btn-flat right" type="submit" value="Add topic">
  </div>
</form>
