// To anyone to may be reading, I am very aware that this JavaScript file is a mess.
// Do not let the poor quality of this code lessen your opinions of me.
// I deliberately did not make any effort to organize my code into multiple files or optimize my code, for the sake of getting something functional out into the world.
// I am typically rigorous when it comes to code organization in my other projects

import * as FCONTENTS from "./file_cont.js"
import * as FFUNCS from "./file_funcs.js"
import Terminal from "./sys/terminal.js";

async function main() {
    Terminal.init();
    const dev = true;
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    if (!dev) {
        Terminal.push_str_line("BrnspcOS™ V0.1.1a")
        Terminal.push_blank_line()
        Terminal.push_blank_line()
        Terminal.push_str_line("Initializing System Check...")
        await sleep(350)
        Terminal.push_blank_line()
        Terminal.push_str_line("System_Date: 13/27/2003")
        await sleep(2000)
        Terminal.push_str_line("Is_Admin: False")
        await sleep(112)
        Terminal.push_str_line("| Username: MildRaccoon")
        await sleep(77)
        Terminal.push_str_line("╵ Password: !temp_pass223")
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
            Terminal.push_str_line(starting_text[i])
        }

        Terminal.push_blank_line()
        Terminal.push_blank_line()
        Terminal.push_str_line("System Status: Probably alright")
        Terminal.push_blank_line()
        Terminal.push_blank_line()

    }

    Terminal.push_str_line("Welcome to BrnspcOS! Enter \"help\" to view the program-list, and learn how to use the terminal!")

    await sleep(220)

    document.addEventListener("keydown", (e) => {

        Terminal.on_new_keystroke(e);

    })

}


function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + 1
}


class Terminal_old {










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


    unzip(args) {
        let usage = () => {
            this.push_str_line("Program usage: `unzip [archive]`")
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

        let file = "" + args[0]
        console.log(file.substring(file.length - 4, file.length))

        if (file.substring(file.length - 4, file.length) != ".zip") {
            this.push_blank_line()
            this.push_str_line("Error: File \"" + file + "\" is not an archive")
            usage()
            return
        }

        let working_dir = this.pwd[this.pwd.length - 1];

        for (let i = 0; i < working_dir.contents.length; i++) {
            let grabbed_entry = working_dir.contents[i]
            if (!grabbed_entry.is_dir && grabbed_entry.name == file) {

                let unzipped_dir = new dir(file.substring(0, file.length - 4), [])
                for (let entryidx = 0; entryidx < grabbed_entry.unzip.length; entryidx++) {
                    console.log(entryidx)
                    unzipped_dir.contents.push(grabbed_entry.unzip[entryidx])
                }
                working_dir.contents.push(unzipped_dir)

                return
            }
        }

        this.push_blank_line()
        this.push_str_line("Error: Archive \"" + file + "\" doen't exist")
        usage()

    }

    lol(args)
    {
        
        let usage = () => {
            this.push_str_line("Program usage: `unzip [archive]`")
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

        let file = "" + args[0]
        console.log(file.substring(file.length - 4, file.length))

        if (file.substring(file.length - 4, file.length) != ".zip") {
            this.push_blank_line()
            this.push_str_line("Error: File \"" + file + "\" is not an archive")
            usage()
            return
        }

        let working_dir = this.pwd[this.pwd.length - 1];

        for (let i = 0; i < working_dir.contents.length; i++) {
            let grabbed_entry = working_dir.contents[i]
            if (!grabbed_entry.is_dir && grabbed_entry.name == file) {

                let unzipped_dir = new dir(file.substring(0, file.length - 4), [])
                for (let entryidx = 0; entryidx < grabbed_entry.unzip.length; entryidx++) {
                    console.log(entryidx)
                    unzipped_dir.contents.push(grabbed_entry.unzip[entryidx])
                }
                working_dir.contents.push(unzipped_dir)

                return
            }
        }

        this.push_blank_line()
        this.push_str_line("Error: Archive \"" + file + "\" doen't exist")
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
    unzip = []
    execute = (args) => { }

    constructor(name, contents, unzip = undefined, on_execute = () => { }) {
        this.name = name
        this.contents = contents
        this.unzip = unzip
        this.on_execute = on_execute
    }
}


const fs = new dir("root", [

    new dir("home", [
        new dir("downloads", [
            new dir("xenia_canary_brnspcos", [
                new dir("build", [
                    new file("xenia_canary", FCONTENTS.xenia_canary),
                    new file("xenia.log", FCONTENTS.xenia_log)
                ]),
                new file("LICENSE", FCONTENTS.xenia_LICENSE)
            ]),

            new file("Diablo_III_Ultimate.zip", FCONTENTS.Diablo_III_Ultimate_zip, [
                new file("Diablo_III_Ultimate.iso", FCONTENTS.Diablo_III_Ultimate_iso),
                new file("readme.txt", FCONTENTS.diablo_readme_txt)
            ]),        
        ]),

        new dir("lols", [
            new file("random_website.lol", FCONTENTS.rand_site_lol, undefined, FFUNCS.random_website)
        ]),

        new dir("secret", [
            new file("floppy.lol", FCONTENTS.floppy_lol, undefined, FFUNCS.floppy)
        ]),

        new file(".bashrc", FCONTENTS.dot_bashrc),
        new file("about_me.txt", FCONTENTS.about_me_txt),
        new file("passwords.txt", FCONTENTS.password_txt),
        new file("binary.txt", FCONTENTS.binary_txt),
        new file("empty.txt", FCONTENTS.empty_txt)
    ]),

    new dir("programs", [

        new dir("system", [
            new file("bash.bsp", FCONTENTS.bsah_bsp),
            new file("help.bsp", FCONTENTS.help_bsp),
            new file("exit.bsp", FCONTENTS.exit_bsp),
            new file("clear.bsp", FCONTENTS.clear_bsp),
            new file("ls.bsp", FCONTENTS.ls_bsp),
        ]),

        new dir("rust", [
            new file("cargo.bsp", FCONTENTS.cargo_bsp),
            new file("rustup.bsp", FCONTENTS.rustup_bsp),
            new file("rustc.bsp", FCONTENTS.rustup_bsp)
        ]),

        new dir("user", [
            new file("super_torrent.bsp", ["[insert binary here (in russian)]"])
        ])
    ]),
])


main()
