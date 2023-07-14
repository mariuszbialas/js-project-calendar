'use strict';

const ajax ={

    async fetchData(query = '') {
        const response = await fetch(`http://127.0.0.1:3000/api/${query}`);
        const data = await response.json();
        return data;
    }
}

export default ajax;