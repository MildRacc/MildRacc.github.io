export default class debugMode{
    public debugMode:boolean = false

    constructor(){
        document.addEventListener('keyup', (event) => { // Do debug mode shit, you can read the code on your own
            console.log("E")
            if(event.code == 'KeyE'){
                if(!this.debugMode){
                    console.log("E2")
                    this.debugMode = true
                }else{
                    console.log("E3")
                    this.debugMode = false
                }
            }
        })
    }


    get debugVal(){ // Return the only value
        return this.debugMode
    }
}