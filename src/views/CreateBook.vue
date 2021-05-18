<template>
  <div class="col-md-12">
    <div class="card card-container">
      <form name="form" @submit.prevent="handleCreateBook" method="post">
        <div class="form-group">
          <label for="name">Book name</label>
          <input
              v-model="book.name"
              v-validate="'required'"
              type="text"
              class="form-control"
              name="name"
          />
          <input type="hidden" name="_token" v-bind:value="csrf">
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Create Book</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BookService from '../services/book.service';

export default {
  name: "CreateBook",
  data() {
    return {
      book: { name: "" },
      loading: false,
      csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    };
  },
  methods: {
    handleCreateBook() {
      BookService.createBook(this.book);
    }
  }
}
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3);
}
</style>