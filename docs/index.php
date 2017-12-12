<!DOCTYPE html>
<html>
<?php require 'inc/head.php'; ?>
<body>
  <main id="app">
    <?php require 'inc/nav.php'; ?>
    <section id="topics" class="container">
      <div class="row" >
        <div class="col s12 m6 l6 xl4" v-for="(topic, i) in topics">
          <topic-card :topic="topic" :index="i" v-model="adding.lang.topic"></topic-card>
        </div>
      </div>
    </section>
    <section>
    </section>
    <?php require 'inc/modals.php'; ?>
  </main>
  <?php require 'inc/templates.php'; ?>
  <?php require 'inc/scripts.php'; ?>
</body>
</html>
