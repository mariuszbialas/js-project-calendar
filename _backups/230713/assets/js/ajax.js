'use strict';

const ajax ={

    async fetchData() {
        const response = await fetch('http://127.0.0.1:3000/api/');
        const data = await response.json();
        return data;
    }

}

export default ajax;