<template>
 <form action="#" @submit.prevent="onSubmit">
    <p v-if="errorsPresent" class="error">Please fill out both fields!</p>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="germany flag"></i> German
      </div>
      <input type="text" placeholder="Enter word..." v-model="formData.german" />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="united kingdom flag"></i> English
      </div>
      <input type="text" placeholder="Enter word..." v-model="formData.english" />
    </div>

    <div class="ui labeled input fluid">
      <div class="ui label">
        <i class="france flag"></i> French
      </div>
      <input type="text" placeholder="Enter word..." v-model="formData.french" />
    </div>

    <button class="positive ui button">Submit</button>
  </form>
</template>

<script>

export default {
  name: 'word-form',
  props: {
     word: {
        type: Object,
        required: false,
        default: () => {
        return {
            english: '',
            german: ''
        };
        }
    }
  },
  data() {
    return {
      errorsPresent: false,
      formData: {
        english: '',
        german: '',
        french: ''
      }
    };
  },
  watch: {
    word: {
      handler(newWord) {
        if (newWord) {
          this.formData = { ...newWord };
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    onSubmit: function() {
      if (!this.formData.english || !this.formData.german || !this.formData.french) {
        this.errorsPresent = true;
        return;
      }
      this.errorsPresent = false;
      this.$emit('submit', this.formData);
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
</style>