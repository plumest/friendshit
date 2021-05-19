import {webClientInstance} from "./axios-create";


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

        return webClientInstance
            .post(`${user_id}/books`, {
                name: book.name
            });
    }

    async getAllBookByUser() {
        let user = JSON.parse(localStorage.getItem('user'));
        let user_id = parseJwt(user.token);
        user_id = user_id._id;
        let data = await webClientInstance.get(`${user_id}/books`);
        return data.data.result
    }
}

export default new BookService();
