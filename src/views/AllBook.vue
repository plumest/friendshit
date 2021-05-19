<template>
  <div class="container">
    <b-button size="small" variant="outline-primary"><router-link to="/books/create">Create new</router-link></b-button>
    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
   <div class="row">
    <div class="col" v-for="book in books" :key="book._id">
      <div class="card" style="width: 18rem;">
        <div class="card-body" v-on:click="viewBook(book._id)">
          <h5 class="card-title">{{book.name}}</h5>
        </div>
      </div>
    </div>
   </div>
  </div>
</template>

<script>
import BookService from '../services/book.service';

export default {
  name: "AllBook",
  data() {
    return {
      books: [],
      loading: true
    }
  },
  methods: {
    viewBook(id) {
      this.$router.push({ path: `/books/${id}` })
    }
  },
  async mounted() {
    this.loading = true
    this.books = await BookService.getAllBookByUser()
    this.loading = false
  }
}
</script>

<style scoped>

</style>
