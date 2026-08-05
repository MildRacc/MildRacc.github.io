import Program from "./program.js"

export default class Help extends Program
{

    static usage = `To use a program, type the name of the desired program, e.g, "help", and press enter to run it. Programs such as \`proj\`, \`redir\`, or \`cd\` take arguments, and entering just the name without any arguments will print a guide on what arguments the program takes, and how to enter them. For example, to redirect to my art page, you would enter \`redir art\`
Available Programs:
    help      Lists all available programs
    exit      Go back home
    clear     Clear all text from terminal
    proj      View details about my projects
    redir     Redirect to a different webpage
    cd        Change directory
    ls        List current directory contents
    rm        Delete file/directory
    cat       Print file contents to terminal
    unzip     Extract contents of an archive to a folder
    lol       Execute a .lol program)`


    static run(args)
    {
        let _ = args
        return this.show_usage()
    }
}

