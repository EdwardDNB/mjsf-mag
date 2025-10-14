<script>
export default {
  name: "OptionsComponent",
  data: function () {
    return {
      title: "Component example",
      counter: 1
    }
  },
  methods: {
    test: function () {
     return this.title + " from method!";
    }
  },
  computed: {
    label: function () {
      return this.title + " counter: "+this.counter;
    }
  },
  mounted() {
    setInterval(() => {
      this.counter++
    }, 1000);
  }
}
</script>

<template>
  <div class="options-example">
    <h2>{{ title }}</h2>
    <h3>{{ test() }}</h3>
    <h4>{{ label }}</h4>
  </div>
</template>

<style scoped>

</style>
