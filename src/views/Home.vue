<template>
  <div class="home">
    <md-card
      v-bind:key="num"
      v-for="(item, num) in machines.data">
      <md-card-header>
        <div class="md-title">{{ item.machine_type }}</div>
      </md-card-header>

      <md-card-content>
        <ul class="description-list">
          <li
            v-bind:key="index"
            v-for="(value, index) in item">
            {{ index }} - {{ value }}
          </li>
        </ul>
      </md-card-content>

      <md-card-actions>
        <md-button @click="() => openDetailsPage(item.id)">Details</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
import { mapState} from 'vuex';

export default {
  name: 'home',
  computed: {
    ...mapState(['machines']),
  },
  methods: {
    openDetailsPage(id) {
      this.$router.push(`machine/${id}`);
    }
  },
  mounted() {
    this.$store.dispatch('getMachines');
  }
}
</script>

<style lang="scss" scoped>
  .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
    border: 1px solid #a3a3a3;
    .md-title {
      text-transform: capitalize;
    }
  }
  .description-list {
    text-align: left;
    list-style:none;
  }
</style>
