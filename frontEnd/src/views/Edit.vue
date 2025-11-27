<template>
  <div>
    <h1>Edit Word</h1>
    <word-form :word="word" @submit="updateWord" />
  </div>
</template>

<script>
import WordForm from '../components/WordForm.vue';
import { api } from '../helpers/helpers.js';

export default {
  name: 'editWord',
  components: {
    'word-form': WordForm
  },
  data: function() {
    return {
      word: {}
    };
  },
  async mounted() {
    this.word = await api.getWord(this.$route.params.id);
  },
  methods: {
    async updateWord(formData) {
      try {
        const updatedData = { ...formData, _id: this.$route.params.id };
        await api.updateWord(updatedData);
        this.$router.push({ name: 'wordList' });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>