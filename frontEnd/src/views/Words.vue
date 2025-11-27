<template>
  <div>
    <h1>Words</h1>
    <table id="words" class="ui celled compact table">
      <thead>
        <tr>
          <th>English</th>
          <th>German</th>
          <th>French</th>
          <th colspan="3" class="center aligned">Actions</th>
        </tr>
      </thead>
      <tr v-for="(word, i) in words" :key="i">
        <td>{{ word.english }}</td>
        <td>{{ word.german }}</td>
        <td>{{ word.french }}</td>
        <td width="75" class="center aligned">
        <router-link :to="{ name: 'showWord', params: { id: word._id }}">Show</router-link>
        </td>
        <td width="75" class="center aligned">
          <router-link :to="{ name: 'editWord', params: { id: word._id }}">Edit</router-link>
        </td>
        <td width="75" class="center aligned" @click.prevent="destroyWord(word._id)">
          <a href="/words/${word._id}">Delete</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { api } from '../helpers/helpers.js';

export default {
  name: 'WordsList',
  data() {
    return {
      words: []
    };
  },
  methods: {
    async destroyWord(id) {
      try {
        await api.deleteWord(id);
        const confirmDelete = window.confirm('Are you sure you want to delete this word?');

        if (!confirmDelete) return;
        await api.deleteWord(id);

        this.words = this.words.filter(word => word._id !== id);
      } catch (error) {
        console.log(error);
      }
    }
  },
  async mounted() {
    this.words = await api.getWords();
  }
};
</script>