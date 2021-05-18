<template>
  <div class="col-md-12">

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
  mounted() {
    this.books = BookService.getAllBookByUser()
  }
}
</script>

<style scoped>

</style>