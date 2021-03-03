<template>
  <div class="overflow-auto">
    <p class="mt-3">Current Page: {{ currentPage }}</p>

    <b-list-group
        v-if="isSuccess"
    >
      <b-list-group-item v-for="person in people" :key="person.id">
        <router-link :to="{ name: 'person', params: { id: person.id }}">
          {{ person.name }}
        </router-link>
      </b-list-group-item>
    </b-list-group>

    <div v-if="canShowPaginationButtons" class="pagination">
      <b-button :disabled="!isPrevButtonActive" variant="primary" @click="fetchPrevPage">Previous Page</b-button>
      <b-button :disabled="!isNextButtonActive" variant="primary" @click="fetchNextPage">Next Page</b-button>
    </div>
    <!-- /.pagination -->

    <div class="d-flex justify-content-center">
      <half-circle-spinner
          v-if="isLoading || isFetching"
          :animation-duration="1000"
          :size="60"
          color="#ff1d5e"
      />

      <change-person-name-form />
    </div>
  </div>
</template>

<script>
/**
 * External dependencies.
 */
import { usePaginateQuery } from '@cytools/vue-query';
import { HalfCircleSpinner } from 'epic-spinners';
import ChangePersonNameForm from '@/components/change-person-name-form/change-person-name-form';

/**
 * Internal dependencies.
 */

export default {
  name: 'App',

  components: {
    ChangePersonNameForm,
    HalfCircleSpinner,
  },

  setup() {
    const {
      data: people,
      currentPage,
      hasMorePages,
      fetchPrevPage,
      fetchNextPage,
      isNextButtonActive,
      isPrevButtonActive,
      isIdle,
      isError,
      isSuccess,
      isLoading,
      isFetching,
      canShowPaginationButtons,
    } = usePaginateQuery('star-wars-people', async (page) => {
          const { results, next } = await fetch(`https://swapi.dev/api/people?page=${page}`)
              .then(response => response.json());

          return {
            data: results.map(result => {
              const splittedUrl = result.url.split('/').filter(value => value);
              return {
                ...result,
                id: splittedUrl[splittedUrl.length - 1],
              };
            }),
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
      isNextButtonActive,
      isPrevButtonActive,
      canShowPaginationButtons,
    };
  },
};
</script>
