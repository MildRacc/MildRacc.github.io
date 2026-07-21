async function main()
{
    const dev = false;
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    let terminal = new Terminal();

    if(!dev){

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

    for (let i = 0; i < starting_text.length; i++)
    {
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

function rand(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + 1
}


class Terminal
{
    term_element
    line_list
    input
    root = fs
    pwd = [fs]

    constructor()
    {
        this.line_list = []
        this.term_element = document.getElementById("terminal");
        this.stack = document.getElementById("stack")
        this.input = document.getElementById("input")
        console.log(this.fs)
    }

    on_new_keystroke(e)
    {
        if (e.ctrlKey || e.metaKey || e.altKey)
        {
            return
        }

        let input_text = "" + e.key;


        if (input_text == "Enter")
        {
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

        for (let i = 0; i < removed_inputs.length; i++)
        {
            if (input_text.toLowerCase() == removed_inputs[i])
            {
                return
            }
        }

        if (input_text == "Backspace" || input_text == "Delete")
        {
            this.input.textContent = this.input.textContent.slice(0, this.input.textContent.length - 1)
            return
        }

        this.input.textContent += input_text;
    }

    push_line()
    {

        if (this.line_list.length > 40)
        {
            this.line_list = this.line_list.reverse();
            let rem = this.line_list.pop()
            rem.remove()
            this.line_list = this.line_list.reverse();
        }

        let new_line = document.createElement("p");
        if (this.input.textContent == "")
        {
            this.input.textContent = "‎"
        } 
        new_line.textContent = "$" + this.input.textContent
        this.stack.appendChild(new_line)
        this.line_list.push(new_line)
        this.input.textContent = ""
    }


    push_str_line(str)
    {

        if (this.line_list.length > 40)
        {
            this.line_list = this.line_list.reverse();
            let rem = this.line_list.pop()
            rem.remove()
            this.line_list = this.line_list.reverse();
        }

        let new_line = document.createElement("p");
        new_line.textContent = str
        this.stack.appendChild(new_line)
        this.line_list.push(new_line)
        this.input.textContent = ""
    }

    push_blank_line()
    {
        if (this.line_list.length > 40)
        {
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





    run_command(str)
    {
        let command = "" + str

        if (command == "") {return}

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
                this.push_str_line("\"" + program +"\" is not a recognized program.")
        }
        
    }




    // COMMANDS DOWN HERE
    

    help()
    {
        this.push_blank_line()
        this.push_str_line("To use a program, type the name of the desired program, e.g, \"help\", and press enter to run it.")
        this.push_str_line("Programs such as `proj`, `redir`, or `cd` take arguments, and entering just the name without any")
        this.push_str_line("arguments will print a guide on what arguments the program takes, and how to enter them.")
        this.push_str_line("For example, to redirect to my art page, you would enter `redir art`")
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



    exit()
    {
        window.location.replace("../index.html");
    }


    clear()
    {

        for(let i = 0; i < this.line_list.length; i++)
        {
            this.line_list[i].remove()
        }
        this.line_list = []
    }
 


    proj(args)
    {
       let usage = () =>
        {
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

        if (args.length == 0)
        {
            this,this.push_blank_line()
            usage()
            return
        }

        if (args.length > 1)
        {
            this.push_blank_line()
            this.push_str_line("Error: Too many arguments specified.")
            usage()
            return
        }

        this.push_blank_line()
        switch (args[0])
        {
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
                this.push_str_line("An LSTM implementation from scratch in Rust for time-series prediction. Built without any ML libraries in order to understand")
                this.push_str_line("how Long-Short-Term-Memory models actually work, and implements backpropagation through time. Takes custom CSV datasets and trains")
                this.push_str_line("models to forecast future values.")
                break
            case "critters":
                this.push_str_line("Critters")
                this.push_str_line("- Rust, Bevy, WGSL")
                this.push_blank_line()
                this.push_str_line("A particle life simulation written entirely in Rust, using the Bevy game engine. The simulation runs entirely on the GPU as a")
                this.push_str_line("series of two shaders. A compute shader is used to calculate the push and pull between each particle, before passing off the")
                this.push_str_line("buffer to the vertex/fragment shaders to draw each particle to the screen.")
                break
            case "shadershader":
                this.push_str_line("ShaderShader")
                this.push_str_line("- Rust, OpenGL, GLSL")
                this.push_blank_line()
                this.push_str_line("A live GLSL shader editor built with Rust and OpenGL. Watches shader files for changes and reloads them in real time, letting you")
                this.push_str_line("instantly see edits without recompiling. Useful for quickly iterating on fragment shaders and visual effects.")
                break
            case "portfolio":
                this.push_str_line("This Website")
                this.push_str_line("- HTML, CSS, JavaSript")
                this.push_blank_line()
                this.push_str_line("The website you are on right now! Showcases (most of) my art, coding, and engineering projects. Written by hand in plain HTML,")
                this.push_str_line("CSS, and JavaScript.")
                break
            case "uselesswindows":
                this.push_str_line("Useless Windows")
                this.push_str_line("- HTML, CSS, JavaScript, React")
                this.push_blank_line()
                this.push_str_line("An interactive web toy that spawns draggable browser windows. Enter a URL to open it in a new fake window, or leave the URL blank")
                this.push_str_line("to get a random website. Completely pointless, but fun.")
                break
            case "mildvr":
                this.push_str_line("MildVR")
                this.push_str_line("- KiCad, Rust, OnShape, 3D Printing")
                this.push_blank_line()
                this.push_str_line("An open-source PCVR headset I'm building as an alternative to Meta's, HTC's, Apple's, and everyone's closed-source VR ecosystems.")
                this.push_str_line("Built around a Rockchip 3588 compute module (CM3588) that handles inside-out tracking from dual cameras, with a custom PCB to")
                this.push_str_line("integrate it with two 2K displays (1440x1440 per eye), WiFi 6E for video streaming, and dual IMUs (BMI270) for head tracking.")
                this.push_str_line("The controllers both run ESP32-S3s with infrared tracking markers and their own IMUs for sensor fusion. All firmware will be written")
                this.push_str_line("in rust for both the headset and controllers. Still in the PCB design phase, but the repo documents my full design process, and all")
                this.push_str_line("my thoughts throughout the process.")
                break
            case "roboglove":
                this.push_str_line("Robotic Glove")
                this.push_str_line("- ESP32, C++, Rust, OnShape, 3D Printing")
                this.push_blank_line()
                this.push_str_line("A glove that tracks your hand using 5 thin-film flex sensors (one per finger) and a BMI160 IMU, capturing 15 degrees of freedom total.")
                this.push_str_line("An ESP32 reads the sensors and transmits data over BLE to a custom C++ application that parses the input and visualizes it as a 3D")
                this.push_str_line("hand model through a web interface. The glove uses 3D printed TPU joints to house the flex sensors while allowing natural hand")
                this.push_str_line("movement, plus an onboard housing for the electronics. Firmware runs calibration sequences on startup to account for individual")
                this.push_str_line("finger lengths and variations in sensor placement.")
                break
            case "osc":
                this.push_str_line("OpenSteamController-Continued")
                this.push_str_line("- KiCad, OnShape, Rust")
                this.push_blank_line()
                this.push_str_line("Contributor to reverse-engineering and modernizing Valve's Steam Controller after discontinuation. Reverse-engineered the original")
                this.push_str_line("firmware, then helped redesign the PCB—swapping the LPC11U37/501 for an ESP32, upgrading from a single IMU to dual BMI270s, and")
                this.push_str_line("replacing Micro-USB with USB-C. Wrote Rust firmware implementing USB HID gamepad protocol and haptics. The project preserves these")
                this.push_str_line("controllers for continued use.")
                break
            case "duncebot":
                this.push_str_line("Duncebot")
                this.push_str_line("- Fusion 360")
                this.push_blank_line()
                this.push_str_line("Duncebot is my most favorite robot because it is the least functional and most ridiculous battlebot I've ever built. Battlebots is a")
                this.push_str_line("game, and games are meant to be fun. Duncebot delivers on that.")
                break
            case "vlad":
                this.push_str_line("Vlad The Bludgeoner")
                this.push_str_line("- OnShape")
                this.push_blank_line()
                this.push_str_line("Vlad is my most technically interesting battlebot yet. Vlad uses two flywheels, that do not touch the ground, to lock the rotational axes")
                this.push_str_line("of the bot through gyroscopic effect. With the rotational axes locked, the bot can only move forward or backward. To change direction,")
                this.push_str_line("keep one wheel spinning, then change the direction the other wheel is spinning. Also features a giant bludgeoning weapon.")
                break
            
            default:
                this,this.push_blank_line()
                this.push_str_line("Error: Id \"" + args[0] + "\" doesn't match any projects")
                break
        }
        this.push_blank_line()
    }


    redir(args)
    {
        let usage = () =>
        {
            this.push_str_line("Program usage: `redir [page]`")
            this.push_blank_line()
            this.push_str_line("Page Options:")
            this.push_str_line("    home")
            this.push_str_line("    art")
            this.push_str_line("    code")
            this.push_str_line("    engineering")
        }

        if (args.length == 0)
        {
            this,this.push_blank_line()
            usage()
            return
        }

        if (args.length > 1)
        {
            this.push_blank_line()
            this.push_str_line("Error: Too many arguments specified.")
            usage()
            return
        }

        switch (args[0])
        {
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


    cd(args)
    {
        let usage = () =>
        {
            this.push_str_line("Program usage: `cd [directory]`")
            this.push_blank_line()
        }

        if (args.length == 0)
        {
            this,this.push_blank_line()
            usage()
            return
        }

        if (args.length > 1)
        {
            this.push_blank_line()
            this.push_str_line("Error: Too many arguments specified.")
            usage()
            return
        }

        let working_dir = this.pwd[this.pwd.length - 1];
        
        if (args[0] == ".")
        {
            return
        }
        if (args[0] == "..")
        {
            if (working_dir.name == "root") { return }
            
            this.pwd.pop()
            return
        }


        for (let i = 0; i < working_dir.contents.length; i++)
        {
            let grabbed_entry = working_dir.contents[i]
            if (grabbed_entry.is_dir && grabbed_entry.name == args[0])
            {
                this.pwd.push(grabbed_entry)
                return
            }
        }

    }


    ls()
    {

        let working_dir = this.pwd[this.pwd.length - 1]
        
        let message = "./ ../ "

        for (let i = 0; i < working_dir.contents.length; i++)
        {
            let content = working_dir.contents[i]
        
            if (content.is_dir)
            {
                message += content.name + "/ "
            }
            else
            {
                message += content.name + " "
            }
        }

        this.push_str_line(message)

    }

    rm(args)
    {
        let usage = () =>
        {
            this.push_str_line("Program usage: `rm [entry]`")
            this.push_blank_line()
        }

        if (args.length == 0)
        {
            this,this.push_blank_line()
            usage()
            return
        }

        if (args.length > 1)
        {
            this.push_blank_line()
            this.push_str_line("Error: Too many arguments specified.")
            usage()
            return
        }

        let working_dir = this.pwd[this.pwd.length - 1];

        for (let i = 0; i < working_dir.contents.length; i++)
        {
            let grabbed_entry = working_dir.contents[i]
            if (grabbed_entry.name == args[0])
            {
                working_dir.contents.splice(i, 1)
                this.pwd[this.pwd.length - 1] = working_dir
                return
            }
        }
        this.push_blank_line()
        this.push_str_line("Error: Entry \"" + args[0] + "\" doesn't exist.")
        usage()

    }

    cat(args)
    {
        let usage = () =>
        {
            this.push_str_line("Program usage: `cat [file]`")
            this.push_blank_line()
        }

        if (args.length == 0)
        {
            this,this.push_blank_line()
            usage()
            return
        }

        if (args.length > 1)
        {
            this.push_blank_line()
            this.push_str_line("Error: Too many arguments specified.")
            usage()
            return
        }

        let working_dir = this.pwd[this.pwd.length - 1];

        for (let i = 0; i < working_dir.contents.length; i++)
        {
            let grabbed_entry = working_dir.contents[i]
            if (!grabbed_entry.is_dir && grabbed_entry.name == args[0])
            {
                console.log("Directory match")
                for (let line = 0; line < grabbed_entry.contents.length; line++)
                {
                    this.push_str_line(grabbed_entry.contents[line])
                }
                return
            }
        }
        this.push_blank_line()
        this.push_str_line("Error: Entry \"" + args[0] + "\" doesn't exist.")
        usage()

    }

}



class dir
{
    is_dir = true
    name = ""
    contents = []

    constructor(name, contents)
    {
        this.name = name
        this.contents = contents
    }
}

class file
{
    is_dir = false
    name = ""
    contents = ""

    constructor(name, contents)
    {
        this.name = name
        this.contents = contents
    }
}


const fs = new dir("root", [
    

    new dir("home", [
        new file("passwords.txt", ["this: !temp_pass223 (change later)","gmail: !temp_pass223 (also change later)","bank: #temP_Pass224 (can wait a bit)","tindr: Password1!"]),
        new file("binary.txt", ["000","001","010","011","100","101","110","111","000"]),
        new file("empty.txt", ["i lied"])
    ]),

    new dir("programs", [
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
        ])
    ]),


])



main()
