import axios from 'axios';

const API_URL = `http://localhost:8090/api/v1/`;

const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

class BookService {
    createBook(book) {
        let user = JSON.parse(localStorage.getItem('user'));
        let user_id = parseJwt(user.token);
        user_id = user_id._id;

        return axios
            .post(API_URL + `${user_id}/books`, {
                name: book.name,
                // _token: csrfToken
            });
    }

    async getAllBookByUser() {
        let user = JSON.parse(localStorage.getItem('user'));
        let user_id = parseJwt(user.token);
        user_id = user_id._id;

        let data = await axios.get(API_URL + `${user_id}/books`);

        return data.data
    }
}

export default new BookService();