class LocalStorage{
    constructor(key){
        this.key = key;
    }

    getLog(){
        return sessionStorage.getItem(this.key);
    }

    setLog(message){
        let local = JSON.parse(sessionStorage.getItem(this.key)) || [];
        local.push(message);
        sessionStorage.setItem(this.key, JSON.stringify(local));
    }
}

export default LocalStorage;
