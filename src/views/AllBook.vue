<template>
  <div class="container">
    <b-button size="small" variant="outline-primary"><router-link to="/books/create">Create new</router-link></b-button>
    <div class="col-md-4" v-for="book in books" :key="book._id">
      <div class="card" style="width: 18rem;">
        <div class="card-body" v-on:click="viewBook(book._id)">
          <h5 class="card-title">{{book.name}}</h5>
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
      books: []
    }
  },
  methods: {
    viewBook(id) {
      this.$router.push({ path: `/books/${id}` })
    }
  },
  async mounted() {
    this.books = await BookService.getAllBookByUser()
    console.log(this.books)
  }
}
</script>

<style scoped>

</style>
