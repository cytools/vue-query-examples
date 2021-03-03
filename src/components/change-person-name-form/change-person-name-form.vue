<template>
  <b-form v-if="peopleIds.length" @submit.prevent="onSubmit">
    <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
      <b-form-input
          id="input-2"
          v-model="newName"
          placeholder="Enter name"
          required
      ></b-form-input>
    </b-form-group>

    <b-form-group id="input-group-3" label="Choose id to update" label-for="input-3">
      <b-form-select id="input-3" v-model="selectedPersonId" :options="peopleIds"></b-form-select>
    </b-form-group>
  </b-form>
</template>

<script>
/**
 * External dependencies.
 */
import { useMutation, useQueryClient } from '@cytools/vue-query';
import { ref, computed } from '@vue/composition-api';

export default {
  name: 'ChangePersonNameForm',

  setup() {
    const newName = ref('');
    const selectedPersonId = ref(1);
    const { queryClient } = useQueryClient();
    const { mutate: changePersonName } = useMutation(
        async (name, personId) => {
          return {
            name,
            personId,
          };
        },
        {
          onSuccess: data => {
            queryClient.updateQueryDataForQueriesWithStartingKey(
                ['person', { value: data.personId }],
                oldData => ({ ...oldData, ...data }),
            );

            queryClient.updateQueryDataForQueriesWithStartingKey(
                'star-wars-people',
                oldData => {
                  return {
                    ...oldData,
                    data: oldData.data.map(person => person.id === data.personId ? { ...person, ...data } : person),
                  };
                },
            );
          },
        },
    );
    const onSubmit = async () => {
      try {
        await changePersonName(newName.value, selectedPersonId.value);
        alert('Changed name!');
      } catch (e) {
        alert('Some problem ocurr!');
      }
    };

    return {
      newName,
      onSubmit,
      selectedPersonId,
      peopleIds: computed(() => {
        const ids = queryClient.getQueriesWithStartingKey('people')
            .value
            ?.map(query => query?.query?.data?.data?.map(person => person.id))
            ?.flat()
            ?.filter(val => val) || [];

        return ids.map(id => ({ value: id, text: id }));
      }),
    };
  },
};
</script>
