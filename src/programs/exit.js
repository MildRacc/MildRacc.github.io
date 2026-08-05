import Program from "./program.js";


export default class Exit extends Program
{
    
    static run()
    {
        window.location.replace("../../index.html");
    }

}
