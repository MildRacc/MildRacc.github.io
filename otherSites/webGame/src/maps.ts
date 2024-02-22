export default class getMaps{

    public readonly mainMapOne = [
        {"shape": "SphereGeometry", "dim": [1, 1, 1], "rot": [0, 0, 0], "pos": [4, 1, -3], "mass": 0, "velo": [0,0,0]},
        {"shape": "BoxGeometry", "dim": [5, 10, 3], "rot": [0, 0, 0], "pos": [-2, 5, 2], "mass": 0, "velo": [0,0,0]},
        {"shape": "ConeGeometry", "dim": [1, 1, 1], "rot": [0, 0, 0], "pos": [8, 1, 0], "mass": 0, "velo": [0,0,0]},




        //DONT put ANYTHING after this box!
        {"shape": "BoxGeometry", "dim": [4, 4, 4], "pos": [1, -30, 1], "mass": 0, "velo": undefined}
    ]

    constructor(){
    }

    public getMap(index:number){
        switch(index){
            case -2:
                return this.mainMapOne
            case -1:
                return this.mainMapOne
            case 0: 
                return this.mainMapOne
            
            default:
                return this.mainMapOne
        }
    }
}