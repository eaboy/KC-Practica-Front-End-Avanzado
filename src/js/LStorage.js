
export default class LStorage{

    constructor(keyName){
        this.keyName = keyName;
    }

    saveData(value) {
        localStorage.setItem(this.keyName, value);
    }

    readData(){
        return localStorage.getItem(this.keyName);
    }
}