<template>
  <div class="d-flex justify-content-center">
    <b-card
        v-if="!isLoadingPerson"
        :title="person.name"
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
    >
      <b-card-text>
        <p>Birth Year: {{ person.birth_year }}</p>
        <p>Mass: {{ person.mass }}</p>
        <p>Hair color: {{ person.hair_color }}</p>
        <p>Skin color: {{ person.skin_color }}</p>
        <p>Eye color: {{ person.eye_color }}</p>
      </b-card-text>
    </b-card>

    <half-circle-spinner
        v-else
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

import { toRefs } from '@vue/composition-api';
import { useQuery } from '@cytools/vue-query';
import { HalfCircleSpinner } from 'epic-spinners';

/**
 * Internal dependencies.
 */

export default {
  name: 'Person',

  components: {
    HalfCircleSpinner,
  },

  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },

  setup(props) {
    const { id } = toRefs(props);
    const { data: person, isLoading: isLoadingPerson } = useQuery(
        ['person', id],
        (personId) => fetch(`https://swapi.dev/api/people/${personId}`)
            .then(response => response.json()),
    );

    return {
      person,
      isLoadingPerson,
    };
  },
};
</script>
