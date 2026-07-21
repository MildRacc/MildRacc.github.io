// To anyone to may be reading, I am very aware that this JavaScript file is a mess.
// Do not let the poor quality of this code lessen your opinions of me.
// I deliberately did not make any effort to organize my code into multiple files or optimize my code, for the sake of getting something functional out into the world.
// I am typically rigorous when it comes to code organization in my other projects

async function main() {
    const dev = false;
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    let terminal = new Terminal();

    if (!dev) {

        terminal.push_str_line("BrnspcOS™ V0.1.1a")
        terminal.push_blank_line()
        terminal.push_blank_line()
        terminal.push_str_line("Initializing System Check...")
        await sleep(350)
        terminal.push_blank_line()
        terminal.push_str_line("System_Date: 13/27/2003")
        await sleep(2000)
        terminal.push_str_line("Is_Admin: False")
        await sleep(112)
        terminal.push_str_line("| Username: MildRaccoon")
        await sleep(77)
        terminal.push_str_line("╵ Password: !temp_pass223")
        await sleep(420)



        let starting_text = [
            "Self_Destruct: False",
            "Display: 1",
            "Graphical Postprocessor: Maybe",
            "FOSS: True",
            "Arch: btw",
            "HID_Interflops: " + rand(980, 2010),
            "Jazz: Punk",
            "│ Birds: Saxophone",
            "╵ Saxophone: Pineapple",
            "div: Centered",
            "Wikipedia: \"https://wikipedia.com\"",
            "Floppy_Drive: True",
            "Optical_Drive: False",
            "USB_Port_Count: 127.5",
            "Memory: 16PB",
            "SIMD: No",
            "RISC-V: True",
            "x86_64: False",
            "x86_128: False",
            "ARM24: False",
            "Big_Number: 9.9E9999",
            "Small_Number: 9.9E-9999",
            "Pi: 3.14159265",
            "Tau: 6.28318531",
            "Evil: False",
            "Chill: Hella",
            "Disk_Write: 383.9 KBps",
            "Disk_Read: 1.98 MBps",
            "Are you reading these?",
            "Rand_Number:" + rand(0, 100000),
            "AI: None",
            "Biocomputing_Module: BioTec7274",
            "│ Nervous_System: None",
            "│ Pulse: True",
            "╰─╮ Heartrate: -12.333 Beats/Lightyear",
            "  │ O2_Carrier: Hemocyanin",
            "  ╵ Mitochondria_per_Cell: 2.0",
            "Gamma: 2.5E-10",
            "Floating_Point_Arithmetic: Never",
            "Posit_Arithmetic: Always",
            "Salmon_Type: Oncorhynchus Tshawytscha",
            "Use_Evil_Trig: Occasionally",
            "Localization: English",
            "Location: United States of Japan",
            "Gears: Turning",
            "Audio: Maybe someday",
            "DE: Init Error",
            "╵ Fallback: TTY3",
            "Input: XInput",
            "Steam: Installed",
            "WLAN: Enabled",
            "│ Uplink: 0.0Mbps",
            "│ Downlink: -32.87Mbps",
            "│ Upload: 0.2Mbps",
            "╵ Download: 11.11Mbps",
            "ETHNET: Enabled",
            "TPU: None",
            "GPU: Some(..default::Default())",
            "│ Graphics_APIs: [\"OpenQL\", \"Vulkan\", \"WebGPU\", \"SQL\"]",
            "│ Graphical_Qubits: 1",
            "│ Vendor: Monogon Ind.",
            "╵ Fast: Yes",
            "Rust: Installed",
            "│ Rustup: v1.29.0",
            "│ Active_Toolchain: nightly-riscv64i*-unknown-brnspc-elf",
            "╵ Cargo: v1.91.1",
        ]

        for (let i = 0; i < starting_text.length; i++) {
            await sleep(5 + rand(0, 25))
            terminal.push_str_line(starting_text[i])
        }

        terminal.push_blank_line()
        terminal.push_blank_line()
        terminal.push_str_line("System Status: Probably alright")
        terminal.push_blank_line()
        terminal.push_blank_line()

    }

    terminal.push_str_line("Welcome to BrnspcOS! Enter \"help\" to view the program-list, and learn how to use the terminal!")



    await sleep(220)

    document.addEventListener("keydown", (e) => {

        terminal.on_new_keystroke(e);

    })

}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + 1
}


class Terminal {
    term_element = document.getElementById("terminal");
    canvas_context
    line_list = []
    stack = document.getElementById("stack")
    input = document.getElementById("input")
    root = fs
    pwd = [fs]

    constructor() {
        const canvas = document.createElement("canvas")
        let context = canvas.getContext("2d")
        context.font = "2.3vh ShareTechMono"

        this.canvas_context = context

    }

    on_new_keystroke(e) {
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

    push_line() {
        if (this.input.textContent == "") {
            this.push_str_line(" ")
        }
        this.push_str_line("$" + this.input.textContent)
        this.input.textContent = ""


    }


    push_str_line(str) {

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

    push_blank_line() {
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





    run_command(str) {
        let command = "" + str.trim()

        if (command == "") { return }

        let split = command.split(" ")
        let program = split[0]

        split = split.reverse();
        split.pop()
        split = split.reverse();
        let args = split;

        switch (program) {
            case "help":
                this.help()
                break
            case "exit":
                this.exit()
                break
            case "clear":
                this.clear()
                break
            case "proj":
                this.proj(args)
                break
            case "redir":
                this.redir(args)
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


            default:
                this.push_str_line("\"" + program + "\" is not a recognized program.")
        }

    }


    text_length_okay(str) {
        let width = Math.ceil(this.canvas_context.measureText(str).width) + 25

        if (width > window.innerWidth) {
            return false
        }

        return true
    }




    // COMMANDS DOWN HERE


    help() {
        this.push_blank_line()
        this.push_str_line("To use a program, type the name of the desired program, e.g, \"help\", and press enter to run it. Programs such as `proj`, `redir`, or `cd` take arguments, and entering just the name without any arguments will print a guide on what arguments the program takes, and how to enter them. For example, to redirect to my art page, you would enter `redir art`")
        this.push_blank_line()
        this.push_str_line("Available Programs:")
        this.push_str_line("    help      Lists all available programs")
        this.push_str_line("    exit      Go back home")
        this.push_str_line("    clear     Clear all text from terminal")
        this.push_str_line("    proj      View details about my projects")
        this.push_str_line("    redir     Redirect to a different webpage")
        this.push_str_line("    cd        Change directory")
        this.push_str_line("    ls        List current directory contents")
        this.push_str_line("    rm        Delete file/directory")
        this.push_str_line("    cat       Print file contents to terminal")
    }



    exit() {
        window.location.replace("../index.html");
    }


    clear() {

        for (let i = 0; i < this.line_list.length; i++) {
            this.line_list[i].remove()
        }
        this.line_list = []
    }



    proj(args) {
        let usage = () => {
            this.push_str_line("Program usage: `proj [id]`")
            this.push_blank_line()
            this.push_str_line("Project IDs by Category:")
            //this.push_str_line("    Art")
            //this.push_str_line("    - lowpoly")
            //this.push_str_line("    - engineer")
            //this.push_str_line("    - dissection")
            //this.push_str_line("    - exp_vid")
            //this.push_str_line("    - spacecowboy_vid")
            //this.push_str_line("    - limits")
            //this.push_str_line("    - collage")
            this.push_str_line("    Code")
            this.push_str_line("    - 4cast")
            this.push_str_line("    - critters")
            this.push_str_line("    - shadershader")
            this.push_str_line("    - portfolio")
            this.push_str_line("    - uselesswindows")
            this.push_str_line("    Engineering")
            this.push_str_line("    - mildvr")
            this.push_str_line("    - roboglove")
            this.push_str_line("    - osc")
            this.push_str_line("    - duncebot")
            this.push_str_line("    - vlad")
        }

        if (args.length == 0) {
            this, this.push_blank_line()
            usage()
            return
        }

        if (args.length > 1) {
            this.push_blank_line()
            this.push_str_line("Error: Too many arguments specified.")
            usage()
            return
        }

        this.push_blank_line()
        switch (args[0]) {
            case "lowpoly":
                break;
            case "engineer":
                break
            case "dissection":
                break
            case "exp_vid":
                break
            case "spacecowboy_vid":
                break
            case "limits":
                break
            case "collage":
                break
            case "4cast":
                this.push_str_line("4Cast")
                this.push_str_line("- Rust")
                this.push_blank_line()
                this.push_str_line("An LSTM implementation from scratch in Rust for time-series prediction. Built without any ML libraries in order to understand how Long-Short-Term-Memory models actually work, and implements backpropagation through time. Takes custom CSV datasets and trains models to forecast future values.")
                break
            case "critters":
                this.push_str_line("Critters")
                this.push_str_line("- Rust, Bevy, WGSL")
                this.push_blank_line()
                this.push_str_line("A particle life simulation written entirely in Rust, using the Bevy game engine. The simulation runs entirely on the GPU as a series of two shaders. A compute shader is used to calculate the push and pull between each particle, before passing off the buffer to the vertex/fragment shaders to draw each particle to the screen.")
                break
            case "shadershader":
                this.push_str_line("ShaderShader")
                this.push_str_line("- Rust, OpenGL, GLSL")
                this.push_blank_line()
                this.push_str_line("A live GLSL shader editor built with Rust and OpenGL. Watches shader files for changes and reloads them in real time, letting you instantly see edits without recompiling. Useful for quickly iterating on fragment shaders and visual effects.")
                break
            case "portfolio":
                this.push_str_line("This Website")
                this.push_str_line("- HTML, CSS, JavaSript")
                this.push_blank_line()
                this.push_str_line("The website you are on right now! Showcases (most of) my art, coding, and engineering projects. Written by hand in plain HTML, CSS, and JavaScript.")
                break
            case "uselesswindows":
                this.push_str_line("Useless Windows")
                this.push_str_line("- HTML, CSS, JavaScript, React")
                this.push_blank_line()
                this.push_str_line("An interactive web toy that spawns draggable browser windows. Enter a URL to open it in a new fake window, or leave the URL blank to get a random website. Completely pointless, but fun.")
                break
            case "mildvr":
                this.push_str_line("MildVR")
                this.push_str_line("- KiCad, Rust, OnShape, 3D Printing")
                this.push_blank_line()
                this.push_str_line("An open-source PCVR headset I'm building as an alternative to Meta's, HTC's, Apple's, and everyone's closed-source VR ecosystems. Built around a Rockchip 3588 compute module (CM3588) that handles inside-out tracking from dual cameras, with a custom PCB to integrate it with two 2K displays (1440x1440 per eye), WiFi 6E for video streaming, and dual IMUs (BMI270) for head tracking. The controllers both run ESP32-S3s with infrared tracking markers and their own IMUs for sensor fusion. All firmware will be written in rust for both the headset and controllers. Still in the PCB design phase, but the repo documents my full design process, and all my thoughts throughout the process.")
                break
            case "roboglove":
                this.push_str_line("Robotic Glove")
                this.push_str_line("- ESP32, C++, Rust, OnShape, 3D Printing")
                this.push_blank_line()
                this.push_str_line("A glove that tracks your hand using 5 thin-film flex sensors (one per finger) and a BMI160 IMU, capturing 15 degrees of freedom total. An ESP32 reads the sensors and transmits data over BLE to a custom C++ application that parses the input and visualizes it as a 3D hand model through a web interface. The glove uses 3D printed TPU joints to house the flex sensors while allowing natural hand movement, plus an onboard housing for the electronics. Firmware runs calibration sequences on startup to account for individual finger lengths and variations in sensor placement.")
                break
            case "osc":
                this.push_str_line("OpenSteamController-Continued")
                this.push_str_line("- KiCad, OnShape, Rust")
                this.push_blank_line()
                this.push_str_line("Contributor to reverse-engineering and modernizing Valve's Steam Controller after discontinuation. Reverse-engineered the original firmware, then helped redesign the PCB—swapping the LPC11U37/501 for an ESP32, upgrading from a single IMU to dual BMI270s, and replacing Micro-USB with USB-C. Wrote Rust firmware implementing USB HID gamepad protocol and haptics. The project preserves these controllers for continued use.")
                break
            case "duncebot":
                this.push_str_line("Duncebot")
                this.push_str_line("- Fusion 360")
                this.push_blank_line()
                this.push_str_line("Duncebot is my most favorite robot because it is the least functional and most ridiculous battlebot I've ever built. Battlebots is a game, and games are meant to be fun. Duncebot delivers on that.")
                break
            case "vlad":
                this.push_str_line("Vlad The Bludgeoner")
                this.push_str_line("- OnShape")
                this.push_blank_line()
                this.push_str_line("Vlad is my most technically interesting battlebot yet. Vlad uses two flywheels, that do not touch the ground, to lock the rotational axes of the bot through gyroscopic effect. With the rotational axes locked, the bot can only move forward or backward. To change direction, keep one wheel spinning, then change the direction the other wheel is spinning. Also features a giant bludgeoning weapon.")
                break

            default:
                this, this.push_blank_line()
                this.push_str_line("Error: Id \"" + args[0] + "\" doesn't match any projects")
                break
        }
        this.push_blank_line()
    }


    redir(args) {
        let usage = () => {
            this.push_str_line("Program usage: `redir [page]`")
            this.push_blank_line()
            this.push_str_line("Page Options:")
            this.push_str_line("    home")
            this.push_str_line("    art")
            this.push_str_line("    code")
            this.push_str_line("    engineering")
        }

        if (args.length == 0) {
            this, this.push_blank_line()
            usage()
            return
        }

        if (args.length > 1) {
            this.push_blank_line()
            this.push_str_line("Error: Too many arguments specified.")
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
                this.push_blank_line()
                this.push_str_line("Error: Page \"" + args[0] + "\" doesn't exist")
                break;
        }

    }


    cd(args) {
        let usage = () => {
            this.push_str_line("Program usage: `cd [directory]`")
            this.push_blank_line()
        }

        if (args.length == 0) {
            this, this.push_blank_line()
            usage()
            return
        }

        if (args.length > 1) {
            this.push_blank_line()
            this.push_str_line("Error: Too many arguments specified.")
            usage()
            return
        }

        let working_dir = this.pwd[this.pwd.length - 1];

        if (args[0] == ".") {
            return
        }
        if (args[0] == "..") {
            if (working_dir.name == "root") { return }

            this.pwd.pop()
            return
        }


        for (let i = 0; i < working_dir.contents.length; i++) {
            let grabbed_entry = working_dir.contents[i]
            if (grabbed_entry.is_dir && grabbed_entry.name == args[0]) {
                this.pwd.push(grabbed_entry)
                return
            }
        }

        this.push_blank_line()
        this.push_str_line("Error: Directory \"" + args[0] + "\" doesn't exist.")
        usage()

    }


    ls() {

        let working_dir = this.pwd[this.pwd.length - 1]

        let message = "./ ../ "

        for (let i = 0; i < working_dir.contents.length; i++) {
            let content = working_dir.contents[i]

            if (content.is_dir) {
                message += content.name + "/ "
            }
            else {
                message += content.name + " "
            }
        }

        this.push_str_line(message)

    }

    rm(args) {
        let usage = () => {
            this.push_str_line("Program usage: `rm [entry]`")
            this.push_blank_line()
        }

        if (args.length == 0) {
            this, this.push_blank_line()
            usage()
            return
        }

        if (args.length > 1) {
            this.push_blank_line()
            this.push_str_line("Error: Too many arguments specified.")
            usage()
            return
        }

        let working_dir = this.pwd[this.pwd.length - 1];

        for (let i = 0; i < working_dir.contents.length; i++) {
            let grabbed_entry = working_dir.contents[i]
            if (grabbed_entry.name == args[0]) {
                working_dir.contents.splice(i, 1)
                this.pwd[this.pwd.length - 1] = working_dir
                return
            }
        }
        this.push_blank_line()
        this.push_str_line("Error: Entry \"" + args[0] + "\" doesn't exist.")
        usage()

    }

    cat(args) {
        let usage = () => {
            this.push_str_line("Program usage: `cat [file]`")
            this.push_blank_line()
        }

        if (args.length == 0) {
            this, this.push_blank_line()
            usage()
            return
        }

        if (args.length > 1) {
            this.push_blank_line()
            this.push_str_line("Error: Too many arguments specified.")
            usage()
            return
        }

        let working_dir = this.pwd[this.pwd.length - 1];

        for (let i = 0; i < working_dir.contents.length; i++) {
            let grabbed_entry = working_dir.contents[i]
            if (!grabbed_entry.is_dir && grabbed_entry.name == args[0]) {
                for (let line = 0; line < grabbed_entry.contents.length; line++) {
                    this.push_str_line(grabbed_entry.contents[line])
                }
                return
            }
        }
        this.push_blank_line()
        this.push_str_line("Error: File \"" + args[0] + "\" doesn't exist.")
        usage()

    }

}



class dir {
    is_dir = true
    name = ""
    contents = []

    constructor(name, contents) {
        this.name = name
        this.contents = contents
    }
}

class file {
    is_dir = false
    name = ""
    contents = ""

    constructor(name, contents) {
        this.name = name
        this.contents = contents
    }
}


const fs = new dir("root", [


    new dir("home", [

        new dir("downloads", [

            new dir("xenia_canary_brnspos", [
                new dir("build", [
                    new file("xenia_canary", ["�r4|�GNU�n PPQ�nQ�n�w�w�wD&UD&U���������x�@�1XI�XY�XY�@ppp ���DD����������S�tdppp P�td�������-�-Q�tdR�td���������p�p�/lib64/ld-brnspcos-x86-64.so.2GNU��GNU�.��hѶݾ0���9��[�HV�rԍ�6P��D���DM*p�%�������-�&�ҽ�{p�y�^p����4%�#6}�/��", "������a���(:'�3���8���TsʄMn%��TJ��Hv��+�L��ԧꬲ��g�,z�[", "@Anostuwyz|}~��������������������������������"]),
                    new file("xenia.log", ["i> F80001F0 Removed handle:F800021C for N2xe6kernel6XEventE", "i> F80001F0 Removed handle:F8000218 for N2xe6kernel6XEventE", "i> F80001F0 Removed handle:F8000214 for N2xe6kernel6XEventE", "i> F80001F0 Removed handle:F8000210 for N2xe6kernel6XEventE"])
                ]),
                new file("LICENSE", ["Copyright (c) 2015, Ben Vanik.", "All rights reserved.", "Redistribution and use in source and binary forms, with or without", "modification, are permitted provided that the following conditions are met:", "blah blah blah, you get the gist."])
            ]),

            new dir("Diablo_III_Ultimate", [
                new file("Diablo_III_Ultimate.iso", ["ik��<k�����H�WH�� �(�hm�W���H��H�H�H�", "D��I��@���t�������������^����s����������|^����s������������^����s���������H��(��b^��h�foZ(���s�H�", "�����������^��q�������������^����p�������������^����p�������������^����p���������H�", "�$`H��P_�O�E3�H�|$E3�3�3�踕L$0H��H��H��rH�I�H��'H+�H�H�����'��H���H�$`�0H�on���Q�H��H��tQH�xE3�H�xE3�H�x�3"])
            ]),

            new file("Diablo_III_Ultimate.zip", ["PK��!_F��������>Diablo III - Reaper of Souls - Ultimate Evil Edition (USA).iso8HK���	<U��?��C�I�P��y&2g�)��y%C��_��d夤�L�H6:zk���6���'���Z�������F���r�w��S�G������Ұ��tC���5�?��#���ch���;�h��	�Gh�Y|96�V)���4��{��k������I���'����7��`N�1�߼ߟ��{.&ϛu~?�	�����59��g��+�DJ�����<H�, ��K�����/����	�y����z��˲¿}��/����������������������0'��`�3����ok�D6�a��"]),
        ]),

        new file(".bashrc", [
            "[[ $- != *i* ]] && return"
        ]),
        new file("about_me.txt", [
            "Hello!",
            " ",
            "If you're reading this, you must certainly be an expert. This text is only present in expert mode!",
            "I don't really feel like adding the actual contents of this file right now. I'll probably do that later (probably)"
        ]),
        new file("passwords.txt", ["this: !temp_pass223 (change later)", "gmail: !temp_pass223 (also change later)", "bank: #temP_Pass224 (can wait a bit)", "tindr: Password1!"]),
        new file("binary.txt", ["000", "001", "010", "011", "100", "101", "110", "111", "000"]),
        new file("empty.txt", ["i lied"])
    ]),

    new dir("programs", [

        new dir("system", [

            new file("bash.bsp", ["env $~/.bashrc sudo run \"$args\""]),

            new file("help.bsp", [
                "help() {",
                "  this.push_blank_line()",
                "  this.push_str_line(\"To use a program, type the name of the desired program, e.g, \"help\", and press enter to run it.\")",
                "  this.push_str_line(\"Programs that take arguments, such as `proj`, `redir`, or `cd` take arguments, and entering just the name of\")",
                "  this.push_str_line(\"without any arguments will print a guide on what arguments the program takes, and how to enter them.\")",
                "  this.push_str_line(\"the program. For example, to redirect to my art page, you would enter `redir art`\")",
                "  this.push_blank_line()",
                "  this.push_str_line(\"Available Programs:\")",
                "  this.push_str_line(\"    help      Lists all available programs\")",
                "  this.push_str_line(\"    exit      Go back home\")",
                "  this.push_str_line(\"    clear     Clear all text from therminal\")",
                "  this.push_str_line(\"    proj      View details about my projects\")",
                "  this.push_str_line(\"    redir     Redirect to a different webpage\")",
                "  this.push_str_line(\"    cd        Change directory\")",
                "  this.push_str_line(\"    ls        List current directory contents\")",
                "  this.push_str_line(\"    rm        Delete file/directory\")",
                "  this.push_str_line(\"    cat       Print file contents to terminal\")",
                "}",
            ]),


            new file("exit.bsp", [
                "exit() {",
                "  window.location.replace(\"../index.html\");",
                "}"
            ]),


            new file("clear.bsp", [
                "clear() {",
                "  for(let i = 0; i < this.line_list.length; i++)",
                "  {",
                "    this.line_list[i].remove()",
                "  }",
                "  this.line_list = []",
                "}",
            ]),

            new file("ls.bsp", [
                "ls() {",
                "  let working_dir = this.pwd[this.pwd.length - 1]",
                "  let message = \"./ ../ \"",
                "  for (let i = 0; i < working_dir.contents.length; i++) {",
                "    let content = working_dir.contents[i]",
                "    if (content.is_dir) {",
                "      message += content.name + \"/ \"",
                "    } else {",
                "      message += content.name + \" \"",
                "    }",
                "  }",
                "  this.push_str_line(message)",
                "}",
            ]),

        ]), // System dir

        new dir("rust", [
            new file("cargo.bsp", ["L[vIô£>eÚ+ŒD¬Úµ[{ ÒÞAzQ‹‘Ý{ji¢[ÿº[§=ö", "…Þû˜#Ù‘y¾L1sºì`@×ÛÝÝ:pÝï1p¸P@-/›¹¶ô¯·Ö<", "‰Js0 ¦(ÆA6ü†Šú­ÛeTûÉÚ´¸ùåb÷s~}é‚g >È}z", "|Oî@¥\\3HØƒhVw¿", "ÐLÌV5z‰Ï¦œEL3š~#S1º6", "Ñ½ŠØA_›¡}\ˆó®©SoßJÅo :5Ç1GLQ3¿Â_È", " ¼ò®ƒ6mïKRXÿWcz\ª(ò9¦º ƒTV–‚*ôé7<ô{¯joÄ…–paªöH	±ÓW ‘@ö"]),
            new file("rustup.bsp", ["‡ H‰…X_  ¸   ‰…P_  é­  L‰µX_  Ç…P_     Hƒ½à_   L‹½ø_  H‹½Ø_  „¡þÿÿÿ¼L‰ H‰Á1ÒI‰øÿ¦L‰ éˆþÿÿM‰üHƒùL‹­ð_  L‹½è_  …ý  ¹rust3·Pòup  	Ê„Â", "  H‰…`]  HÇ…h]     H<õ H‰…°  H…°  H‰…Ð=  H. H‰…Ø=  L‰­¨_  L‰½ _  H‹…Ø_  H‰…˜_  H‹…à_  H‰…_  L=]4 Hp]  L…Ð=  L‰úèšÙ 1ÀH;…p]    HÇ…°      HÇ…¸     HÇ…À      H…`]  H‰…Ð=  H¥’ H‰…Ø=  H…°  H‰…à=  H)ç H‰…è=  H¥3 Hø\  L…Ð=  èÙ Hƒ½°   tH‹½¸  ÿYK‰ H‰Á1ÒI‰øÿCK‰ L‹­ð_  L‰­¨_  H‹…è_  H‰… _  H‹½Ø_  H‰½˜_  H‹…à_  H‰…_  Hø\  èß]ˆ H‰…X_  Ç…P_     Hƒ½à_   tÿæJ‰ H‰Á1ÒI‰øÿÐJ‰ L‹½ø_  AÆGH I‹G HÑàH…À„æ  I‹(ÿ²J‰ H‰Á1ÒI‰øÿœJ‰ I‹@Hƒÿÿ…Ê  éà  Hƒù"]),
            new file("rustc.bsp", ["	Á„,  3A¸tfmtD3@ëGHºcargo-miH3D·@Iðri  é÷   ºrust3D¶@AƒðcA	Ð„ç   ºcarg3D¶@AƒðoA	Ð…-åÿÿéÉ   Hºrust-gdbH3I¸t-gdbguiL3@é    Hºcargo-clH3D‹@Iðippyéƒ   Hºrust-gdbH9…ØäÿÿëwHºrust-lldH3D¶@IƒðbI	Ðt\Hºcargo-fmH3D¶@Iƒðtë;Hºclippy-dH3I¸y-driverL3@I	Ðt$Hºrust-anaH3I¸analyzerL3@I	Ð…_äÿÿAÆD$H I‹\$8IT$PH‰•Ð_  H‹•à_  I‰T$PH‹•Ø_  I‰T$X(…P]  AD$`I‰D$pI‰L$xI‰œ$€   M´$à   AÆ„$à    é4Ùÿÿ1ÉL‰òèŒ®g H…À„ð   H‹H_  H‰L‰h(E°@L‰½Ð=  H‰…Ø=  HÇ…à=     A¾   A½0   L½Ð=  ë@H‹…Ø=  L‹¥è]  L‹]  L‹•H_  N‰T(ðN‰L(ø(…°  B(IÿÆL‰µà=  IƒÅ I‹T$M‹D$L9ÂtcHJ I‰L$L‹L‹JB)…°  L‰ÒH÷Úp@L;µÐ=  u¡L‰•H_  L‰]  I)ÈIÁèIÿÀHÇD$     A¹   L‰ùL‰òèRÙ† éNÿÿÿL‰"])
        ])

    ]),


])



main()
