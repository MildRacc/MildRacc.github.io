import Terminal from "../sys/terminal.js";
import Program from "./program.js";




export default class Redir extends Program
{

    static usage = `Program usage: \`redir [page]\`

Page Options:
    home
    art
    code
    engineering
`


    static run(args)
    {


        if (args.length == 0 || args[0] == "-h" || args[0] == "--help") {
            Terminal.push_blank_line()
            Terminal.push_output(this.usage)
            return
        }

        if (args.length > 1) {
            Terminal.push_blank_line()
            Terminal.push_str_line("Error: Too many arguments specified.")
            usage()
            return
        }

        switch (args[0]) {
            case "home":
                window.location.replace("../index.html");
                break;
            case "art":
                window.location.replace("../subpages/art.html");
                break;
            case "code":
                window.location.replace("../subpages/code.html");
                break;
            case "engineering":
                window.location.replace("../subpages/engineering.html");
                break;

            default:
                Terminal.push_blank_line()
                Terminal.push_str_line("Error: Page \"" + args[0] + "\" doesn't exist")
                break;
        }

    }

}
