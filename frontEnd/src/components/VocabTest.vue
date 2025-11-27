<template>
  <div>
    <h2>Score: {{ score }} out of {{ this.words.length }}</h2>

    <form action="#" @submit.prevent="onSubmit">
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="germany flag"></i> German
        </div>
        <input type="text" readonly :disabled="testOver" :value="currWord.german"/>
      </div>
      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="united kingdom flag"></i> English
        </div>
        <input type="text" placeholder="Enter word..." v-model="english" :disabled="testOver" autocomplete="off" />
      </div>

      <div class="ui labeled input fluid">
        <div class="ui label">
          <i class="france flag"></i> French
        </div>
        <input type="text" placeholder="Enter word..." v-model="french" :disabled="testOver" autocomplete="off" />
      </div>

      

      <button class="positive ui button" :disabled="testOver">Submit</button>
    </form>

    <p :class="['results', resultClass]">
      <span v-html="result"></span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'vocab-test',
  props: {
    words: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      randWords: [...this.words].sort(() => 0.5 - Math.random()),
      incorrectGuesses: [],
      partialCorrect: [],
      result: '',
      resultClass: '',
      english: '',
      french: '',
      score: 0,
      testOver: false
    };
  },
  computed: {
    currWord: function() {
      return this.randWords.length ? this.randWords[0] : '';
    }
  },
  methods: {
    onSubmit: function() {
      if (this.english === this.currWord.english) {
        this.result = 'Correct!';
        this.resultClass = 'success';
        this.score += 1;
      }
      if (this.french === this.currWord.french) {
        this.result = 'Correct!';
        this.resultClass = 'success';
        this.score += 1;
      }
      //Parially correct case
      if (this.english === this.currWord.english || this.french === this.currWord.french) {
        this.result = 'Partially Correct!';
        this.resultClass = 'warning';
        this.partialCorrect.push(this.currWord.german);

      } else {
        this.result = 'Wrong!';
        this.resultClass = 'error';
        this.incorrectGuesses.push(this.currWord.german);
      }

      this.english = '';
      this.french = '';
      this.randWords.shift();

      if (this.randWords.length === 0) {
        this.testOver = true;
        this.displayResults();
      }
    },
    displayResults: function() {
      if (this.incorrectGuesses.length === 0) {
        this.result = 'You got everything correct. Well done!';
        this.resultClass = 'success';

        
      } else {
        const incorrect = this.incorrectGuesses.join(', ');
        const partially = this.partialCorrect.join(', ');
        if (this.partialCorrect.length > 0) {
          this.result = `<strong>You got the following words partially correct:</strong> ${partially}<br>`;
        }
        this.result += `<strong>You got the following words wrong:</strong> ${incorrect}`;
        this.resultClass = 'error';
      }
    }
  }
};
</script>

<style scoped>
.results {
  margin: 25px auto;
  padding: 15px;
  border-radius: 5px;
}

.error {
  border: 1px solid #ebccd1;
  color: #a94442;
  background-color: #f2dede;
}

.success {
  border: 1px solid #d6e9c6;
  color: #3c763d;
  background-color: #dff0d8;
}
</style>