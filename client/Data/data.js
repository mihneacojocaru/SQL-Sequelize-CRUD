export default class Data{
    api(path, method = 'GET', body = null){
        let url = path;

        const options = {
            method,
            headers:{
                "Content-Type": "application/json;charset=utf-8"
            }
        };

        if(body != null){
            options.body = JSON.stringify(body);
        }

        return fetch(url,options);
    }

    getMessages = async () => {
        try {
            const response = await this.api('http://localhost:8000/db/v1/chatApp/');
            if(response.status == 200){
                return response.json();
            }else{
                return Promise.reject(error);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    sendMessage = async (item) => {
        try {
            const response = await this.api('http://localhost:8000/db/v1/chatApp/','POST', item);
            return response.json();
        } catch (error) {
            return Promise.reject(error);
        }
    }
}