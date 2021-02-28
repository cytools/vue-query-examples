<template>
  <div class="overflow-auto">
    <p class="mt-3">Current Page: {{ currentPage }}</p>

    <template
        v-if="isSuccess"
    >
      <b-card
          v-for="person in people"
          :key="person.id"
          :title="person.name"
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
      >
        <b-card-text>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </b-card-text>

        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
    </template>

    <b-button variant="primary" @click="fetchPrevPage">Previous Page</b-button>
    <b-button variant="primary" @click="fetchNextPage">Next Page</b-button>

    <half-circle-spinner
        v-if="isLoading || isFetching"
        :animation-duration="1000"
        :size="60"
        color="#ff1d5e"
    />
  </div>
</template>

<script>
/**
 * External dependencies.
 */
import { usePaginateQuery } from '@cytools/vue-query';
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
      currentPage,
      hasMorePages,
      fetchPrevPage,
      fetchNextPage,
      isIdle,
      isError,
      isSuccess,
      isLoading,
      isFetching,
    } = usePaginateQuery('star-wars-people', async (page) => {
          const { results, next } = await fetch(`https://swapi.dev/api/people?page=${page}`)
              .then(response => response.json());

          return {
            data: results,
            hasNextPage: !!next,
          };
        },
    );

    return {
      people,
      isIdle,
      isError,
      isLoading,
      isSuccess,
      isFetching,
      currentPage,
      hasMorePages,
      fetchNextPage,
      fetchPrevPage,
    };
  },
};
</script>
