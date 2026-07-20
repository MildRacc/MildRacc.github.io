async function main()
{

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    let terminal = new Terminal();

    await sleep(2000)
    terminal.push_str_line("BrnspcOS™ V0.1.1a")
    terminal.push_blank_line()
    terminal.push_blank_line()
    terminal.push_str_line("Initializing System Check...")
    await sleep(220)


    let starting_text = [
        "‎",
        "Is_Admin: False",
        "| Username: Xx_SuperHaxor_xX",
        "| Password: ********",
        "System_Time: 13/27/1991",
        "Self_Destruct: False",
        "Display: 1",
        "Graphical Postprocessor: Maybe",
        "FOSS: True",
        "Arch: btw",
        "HID_Interflops: " + rand(980, 2010),
        "Pulse: True",
        "| Heartrate: -12.333 Beat(s)/Lightyear",
        "| Hemoglobin: False",
        "| Hemocyanin: True",
        "| Mitochondirii/Cell: 2.0",
        "Jazz: Punk",
        "| Birds: Saxaphone",
        "| Saxaphone: Pineapple",
        "Floppy_Drive: True",
        "Optical_Drive: False",
        "USB_Port_Count: 127.5",
        "Memory: 16PB",
        "SIMD: No",
        "RISC-V: True",
        "x86_64: False",
        "x86_128: False",
        "ARM64: False",
        "Pi: 3.14159265",
        "Tau: 6.28318531",
        "Evil: False",
        "Chill: Hella",
        "Disk_Write: 383.9 KBps",
        "Disk_Read: 1.98 MBps",
        "Localization: English",
        "Location: United States of Japan",
        "Are you reading these?",
        "Rand_Number:" + rand(0, 100000),
        "AI: None",
        "Gamma: 2.5E-10",
        "Big_Number: 9.9E9999",
        "Small_Number: 9.9E-9999",
        "Floating_Point_Arithmetic: Never",
        "Posit_Arithmetic: Always",
        "Salmon_Type: Oncorhynchus Tshawytscha",
        "Use_Evil_Trig: Occasionally",
        "Wikipedia: https://wikipedia.com",
        "Nervous_System: None",
        "Gears: Turning",
        "Audio: Pipewire",
        "DE: Error",
        "Input: XInput",
        "Steam: Installed",
        "WLAN: Enabled",
        "| Uplink: 0.0Mbps",
        "| Downlink: -32.87Mbps",
        "| Upload: 0.2Mbps",
        "| Download: 11.11Mbps",
        "ETHNET: Enabled",
        "TPU: None",
        "GPU: Some(..default::Default())",
        "Rust: Installed",
        "| Rustup: v1.29.0",
        "| Active_Toolchain: nightly-riscv64i*-unknown-brnspc-elf",
        "| Cargo: v1.91.1",
    ]   

    for (let i = 0; i < starting_text.length; i++)
    {
        await sleep(5 + rand(0, 25))
        terminal.push_str_line(starting_text[i])
    }

    terminal.push_blank_line()
    terminal.push_blank_line()
    terminal.push_str_line("System: Probably alright")
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

    constructor()
    {
        this.line_list = []
        this.term_element = document.getElementById("terminal");
        this.stack = document.getElementById("stack")
        this.input = document.getElementById("input")
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
        new_line.textContent = this.input.textContent
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
        new_line.textContent = "‎"
        this.stack.appendChild(new_line)
        this.line_list.push(new_line)
    }


    run_command(str)
    {
        let command = "" + str

        let split = command.split()
        let program = split[0]
        
        switch (program) {
            case "help":
                console.log("help")
                break;
        
            default:
                this.push_str_line("\"" + program +"\" is not a recognized program.")
        }
        
    }
}


const COMMANDS = {
    "help": help

}

function help(args)
{
    console.log("help")
}

main()