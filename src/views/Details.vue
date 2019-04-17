<template>
  <div class="machine">
    <md-card>
      <md-card-header>
        <div class="md-title">{{ machine.data.machine_type }}</div>
      </md-card-header>

      <md-card-content>
        <ul class="description-list">
          <li
            v-for="(value, index) in machine.data"
            v-bind:key="index"
            v-if="index != 'events'">
            {{ index }} - {{ value }}
          </li>
        </ul>
      </md-card-content>

      <md-list class="md-triple-line">
        <div
          v-for="(event, i) in machine.data.events"
          v-bind:key="i">
          <md-list-item>
            <md-avatar>
              <img src="https://placeimg.com/40/40/tech/grayscale" alt="Tech">
            </md-avatar>

            <div class="md-list-item-text">
              <span>{{ event.status }}</span>
              <span>{{ event.timestamp | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</span>
            </div>

          </md-list-item>
          <md-divider class="md-inset"></md-divider>
        </div>
      </md-list>
    </md-card>
  </div>
</template>

<script>
import { mapState} from 'vuex';

export default {
  name: 'machine',
  computed: {
    ...mapState(['machine']),
  },
  mounted() {
    this.$store.dispatch('getMachineDetails', this.$route.params.id);
  }
}
</script>

<style lang="scss" scoped>
  .md-title {
    text-transform: capitalize;
  }
  .description-list {
    text-align: left;
    list-style:none;
  }
</style>
