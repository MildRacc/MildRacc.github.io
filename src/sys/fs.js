

export default class FileSystem
{

    static root = fs
    static pwd = [fs]


    /**
     * @param {string} path
     * @returns {boolean}
     * @static
    */
    static path_exists(path)
    {
        let split_path = path.split('/')

        for(let i in split_path)
        {
            let curr = split_path[i]


        }

        return true

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

    /**
     * @param {string} dir 
     * @returns {boolean}
    */
    subdir_exists(dir_name)
    {

        for (let i in this.contents)
        {
            let entry = this.contents[i]
            {
                if (typeof entry == typeof dir && entry.name == dir_name)
                {
                    return true
                }

            }
        }

        return false

    }



    file_exists(file_name)
    {

        for (let i in this.contents)
        {
            let entry = this.contents[i]
            {
                if (typeof entry == typeof file && entry.name == file_name)
                {
                    return true
                }

            }
        }

        return false

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
