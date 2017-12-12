<app-nav inline-template v-bind:logo="logo" v-bind:nav="nav">
<nav>
  <div class="nav-wrapper">
    <a href="#" class="brand-logo">{{ logo }}</a>
    <ul id="nav-mobile" class="right hide-on-med-and-down">
      <li v-for="link in nav"><a :class="link.class" :href="link.href">{{link.text}}</a></l1>
    </ul>
  </div>
</nav>
</app-nav>
