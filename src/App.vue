<template>
  <div class="star-wars-container">
    <div v-if="isLoading">
      <half-circle-spinner
          :animation-duration="1000"
          :size="60"
          color="#ff1d5e"
      />
    </div>
    <div v-else-if="isSuccess" class="star-wars-container__body">
      <ul>
        <li v-for="person in people" :key="person.name">
          <a :href="person.name">name: {{ person.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/**
 * External dependencies.
 */
import { useQuery } from '@cytools/vue-query';
import { HalfCircleSpinner } from 'epic-spinners';

/**
 * Internal dependencies.
 */

export default {
  name: 'App',

  components: {
    HalfCircleSpinner,
  },

  setup() {
    const {
      data: people,
      isIdle,
      isError,
      isSuccess,
      isLoading,
    } = useQuery('star-wars-people', () => fetch('https://swapi.dev/api/people')
        .then(response => response.json())
        .then(data => data.results),
    );

    return {
      people,
      isIdle,
      isError,
      isLoading,
      isSuccess,
    };
  },
};
</script>
