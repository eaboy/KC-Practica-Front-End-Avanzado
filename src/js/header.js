
export default class Header {

    constructor(Animation){
        this.searchAnimations = new Animation('.search-box');
        this.signRegister = new Animation('.sign-box');
    }

    init() {
        this.searchAnimations.setAnimation('.search','toggleItem');
        this.signRegister.setAnimation('.sign-in','toggleItem');
    }

}