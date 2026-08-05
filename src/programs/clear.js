import Terminal from "../sys/terminal.js";
import Program from "./program.js";



export default class Clear extends Program
{
    static run()
    {
        for (let i = 0; i < Terminal.line_list.length; i++) {
            Terminal.line_list[i].remove()
        }
        Terminal.line_list = []
    }
}
