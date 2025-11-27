<template>
  <div>
    <h1>New Word</h1>
    <word-form :word="word" @submit="createWord" />
  </div>
</template>

<script>
import WordForm from '../components/WordForm.vue';
import { api } from '../helpers/helpers.js';

export default {
  name: 'NewWord',
  components: {
    WordForm
  },
  data() {
    return {
      word: {
        english: '',
        german: '',
        french: ''
      }
    };
  },
  methods: {
    async createWord(formData) {
      try {
        await api.createWord(formData);
        this.$router.push({ name: 'wordList' });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
