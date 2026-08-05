import Clear from "../programs/clear.js";
import Exit from "../programs/exit.js";
import Help from "../programs/help.js";
import Proj from "../programs/proj.js";
import Redir from "../programs/redir.js";



export default class Terminal
{
    static term_element = document.getElementById("terminal");
    static canvas_context
    static line_queue = []
    static line_list = []
    static stack = document.getElementById("stack")
    static input = document.getElementById("input")

    static init() {
        const canvas = document.createElement("canvas")
        let context = canvas.getContext("2d")
        context.font = "2.3vh ShareTechMono"

        this.canvas_context = context

    }


    static on_new_keystroke(e) {

        if (e.ctrlKey || e.metaKey || e.altKey) {
            return
        }

        let input_text = "" + e.key;


        if (input_text == "Enter") {
            let command = this.input.textContent
            this.push_line()
            this.run_command(command)

            return
        }


        let removed_inputs = [
            "escape",
            "shift",
            "arrowup",
            "arrowleft",
            "arrowdown",
            "arrowright",
            "contextmenu",
            "tab",
            "capslock",
        ]

        for (let i = 0; i < removed_inputs.length; i++) {
            if (input_text.toLowerCase() == removed_inputs[i]) {
                return
            }
        }

        if (input_text == "Backspace" || input_text == "Delete") {
            this.input.textContent = this.input.textContent.slice(0, this.input.textContent.length - 1)
            return
        }

        this.input.textContent += input_text;
    }


    /**
     * @param {string} str
    */ 
    static push_output(str)
    {
        let lines = str.split("\n")

        console.log(lines)

        for (let i in lines)
        {
            this.push_str_line(lines[i])
        }


        this.input.textContent = ""
    }


    static push_line() {
        if (this.input.textContent == "") {
            this.push_str_line(" ")
        }
        this.push_str_line("$" + this.input.textContent)
        this.input.textContent = ""
    }


    static push_str_line(str) {

        let text_arr = ("" + str).split(" ")
        let text_composite = ""
        let lines_to_push = []

        while (text_arr.length > 0) {
            let word = text_arr.at(0)
            if (!this.text_length_okay(word)) {
                let charr_arr = word.split("")
                let sub_composite = ""

                while (charr_arr.length > 0) {
                    let char = charr_arr.at(0)

                    if (this.text_length_okay(sub_composite + char)) {
                        charr_arr.splice(0, 1)
                        sub_composite += char
                    }
                    else {
                        charr_arr.splice(0, 1)
                        text_composite += sub_composite
                        sub_composite = ""
                        lines_to_push.push(text_composite)
                        text_composite = ""
                        text_arr.splice(0, 1)
                    }
                }
                continue
            }

            if (this.text_length_okay(text_composite + word)) {
                text_arr.splice(0, 1)
                text_composite += word + " "
            }
            else {
                lines_to_push.push(text_composite)
                text_composite = ""
            }
        }

        lines_to_push.push(text_composite)


        while (lines_to_push.length > 0) {
            let text = lines_to_push.shift()

            if (this.line_list.length > 40) {
                let rem = this.line_list.shift()
                rem.remove()
            }

            let new_line = document.createElement("p");
            new_line.textContent = text
            this.stack.appendChild(new_line)
            this.line_list.push(new_line)
        }
    }


    static push_blank_line() {
        if (this.line_list.length > 40) {
            this.line_list = this.line_list.reverse();
            let rem = this.line_list.pop()
            rem.remove()
            this.line_list = this.line_list.reverse();
        }

        let new_line = document.createElement("p");
        new_line.textContent = " "
        this.stack.appendChild(new_line)
        this.line_list.push(new_line)
    }


    static run_command(str) {
        let command = "" + str.trim()

        if (command == "") { return }

        let split = command.split(" ")
        let program = split[0]

        split = split.reverse();
        split.pop()
        split = split.reverse();
        let args = split;

        let output = ""

        switch (program) {
            case "help":
                output += Help.run()
                break
            case "exit":
                Exit.run() 
                break
            case "clear":
                Clear.run() 
                break
            case "proj":
                Proj.run(args)
                break
            case "redir":
                Redir.run(args)
                break
            case "cd":
                this.cd(args)
                break
            case "ls":
                this.ls()
                break
            case "rm":
                this.rm(args)
                break
            case "cat":
                this.cat(args)
                break
            case "unzip":
                this.unzip(args)
                break
            case "lol":
                this.lol(args)
                break


            default:
                this.push_str_line("\"" + program + "\" is not a recognized program.")
        }

        this.push_output(output)

    }


    static text_length_okay(str) {
        let width = Math.ceil(this.canvas_context.measureText(str).width) + 25

        if (width > window.innerWidth) {
            return false
        }

        return true
    }


}
