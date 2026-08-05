import Terminal from "../sys/terminal.js";
import Program from "./program.js";



export default class Proj extends Program
{

    static usage = `Program usage: \`proj [id]\`

Project IDs by Category:
    Code
    - 4cast
    - critters
    - shadershader
    - portfolio
    - uselesswindows
    Engineering
    - mildvr
    - roboglove
    - osc
    - duncebot
    - vlad
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
            Terminal.push_output(this.usage)
            return
        }

        Terminal.push_blank_line()
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
                Terminal.push_str_line("4Cast")
                Terminal.push_str_line("- Rust")
                Terminal.push_blank_line()
                Terminal.push_str_line("An LSTM implementation from scratch in Rust for time-series prediction. Built without any ML libraries in order to understand how Long-Short-Term-Memory models actually work, and implements backpropagation through time. Takes custom CSV datasets and trains models to forecast future values.")
                break
            case "critters":
                Terminal.push_str_line("Critters")
                Terminal.push_str_line("- Rust, Bevy, WGSL")
                Terminal.push_blank_line()
                Terminal.push_str_line("A particle life simulation written entirely in Rust, using the Bevy game engine. The simulation runs entirely on the GPU as a series of two shaders. A compute shader is used to calculate the push and pull between each particle, before passing off the buffer to the vertex/fragment shaders to draw each particle to the screen.")
                break
            case "shadershader":
                Terminal.push_str_line("ShaderShader")
                Terminal.push_str_line("- Rust, OpenGL, GLSL")
                Terminal.push_blank_line()
                Terminal.push_str_line("A live GLSL shader editor built with Rust and OpenGL. Watches shader files for changes and reloads them in real time, letting you instantly see edits without recompiling. Useful for quickly iterating on fragment shaders and visual effects.")
                break
            case "portfolio":
                Terminal.push_str_line("This Website")
                Terminal.push_str_line("- HTML, CSS, JavaSript")
                Terminal.push_blank_line()
                Terminal.push_str_line("The website you are on right now! Showcases (most of) my art, coding, and engineering projects. Written by hand in plain HTML, CSS, and JavaScript.")
                break
            case "uselesswindows":
                Terminal.push_str_line("Useless Windows")
                Terminal.push_str_line("- HTML, CSS, JavaScript, React")
                Terminal.push_blank_line()
                Terminal.push_str_line("An interactive web toy that spawns draggable browser windows. Enter a URL to open it in a new fake window, or leave the URL blank to get a random website. Completely pointless, but fun.")
                break
            case "mildvr":
                Terminal.push_str_line("MildVR")
                Terminal.push_str_line("- KiCad, Rust, OnShape, 3D Printing")
                Terminal.push_blank_line()
                Terminal.push_str_line("An open-source PCVR headset I'm building as an alternative to Meta's, HTC's, Apple's, and everyone's closed-source VR ecosystems. Built around a Rockchip 3588 compute module (CM3588) that handles inside-out tracking from dual cameras, with a custom PCB to integrate it with two 2K displays (1440x1440 per eye), WiFi 6E for video streaming, and dual IMUs (BMI270) for head tracking. The controllers both run ESP32-S3s with infrared tracking markers and their own IMUs for sensor fusion. All firmware will be written in rust for both the headset and controllers. Still in the PCB design phase, but the repo documents my full design process, and all my thoughts throughout the process.")
                break
            case "roboglove":
                Terminal.push_str_line("Robotic Glove")
                Terminal.push_str_line("- ESP32, C++, Rust, OnShape, 3D Printing")
                Terminal.push_blank_line()
                Terminal.push_str_line("A glove that tracks your hand using 5 thin-film flex sensors (one per finger) and a BMI160 IMU, capturing 15 degrees of freedom total. An ESP32 reads the sensors and transmits data over BLE to a custom C++ application that parses the input and visualizes it as a 3D hand model through a web interface. The glove uses 3D printed TPU joints to house the flex sensors while allowing natural hand movement, plus an onboard housing for the electronics. Firmware runs calibration sequences on startup to account for individual finger lengths and variations in sensor placement.")
                break
            case "osc":
                Terminal.push_str_line("OpenSteamController-Continued")
                Terminal.push_str_line("- KiCad, OnShape, Rust")
                Terminal.push_blank_line()
                Terminal.push_str_line("Contributor to reverse-engineering and modernizing Valve's Steam Controller after discontinuation. Reverse-engineered the original firmware, then helped redesign the PCB—swapping the LPC11U37/501 for an ESP32, upgrading from a single IMU to dual BMI270s, and replacing Micro-USB with USB-C. Wrote Rust firmware implementing USB HID gamepad protocol and haptics. The project preserves these controllers for continued use.")
                break
            case "duncebot":
                Terminal.push_str_line("Duncebot")
                Terminal.push_str_line("- Fusion 360")
                Terminal.push_blank_line()
                Terminal.push_str_line("Duncebot is my most favorite robot because it is the least functional and most ridiculous battlebot I've ever built. Battlebots is a game, and games are meant to be fun. Duncebot delivers on that.")
                break
            case "vlad":
                Terminal.push_str_line("Vlad The Bludgeoner")
                Terminal.push_str_line("- OnShape")
                Terminal.push_blank_line()
                Terminal.push_str_line("Vlad is my most technically interesting battlebot yet. Vlad uses two flywheels, that do not touch the ground, to lock the rotational axes of the bot through gyroscopic effect. With the rotational axes locked, the bot can only move forward or backward. To change direction, keep one wheel spinning, then change the direction the other wheel is spinning. Also features a giant bludgeoning weapon.")
                break

            default:
                this, Terminal.push_blank_line()
                Terminal.push_str_line("Error: Id \"" + args[0] + "\" doesn't match any projects")
                break
        }
        Terminal.push_blank_line()


    }
    



}





        
