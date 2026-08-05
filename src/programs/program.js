
/**
* @static
*/
export default class Program
{
    /**
    * @static
    */
    static usage = ""

    /** 
    * @returns {string[]}
    * @param {string} str 
    * @static
    */
    static parse_args(str)
    {
        let out = "" + str

        return out.split(" ") 
    }

    /**
    * @returns {string[]} 
    * @static
    */
    static show_usage()
    {
        return this.usage
    }

    /** 
    * @returns {string[]}
    * @param {string} args
    * @static
    */
    static run(args) { console.log("program") }

}
