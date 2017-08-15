
export default class Header {

    constructor(Animation){
        this.searchAnimations = new Animation('.search-group'); //
        this.signRegister = new Animation('.signRegister');
    }

    init() {
        this.searchAnimations.setAnimation('.search','toggleItem');
    }

}