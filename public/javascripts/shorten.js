var alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var base = alphabet.length;

function encode(id){
//After assigning user url to a unique id {seq in counterSchema}, take the id and convert it into a short string
    var alias = '';
    while(id){
        var remainder = id%base;
        id = Math.floor(id/base);
        alias = alphabet[remainder].toString() + alias;
    }
    return alias;

}

//get a short string from encode function and return the unique id that will map to the orginal url.
function decode(str){
    var id = 0;
    while(str){
        var index = alphabet.indexOf(str[0]);
        var power = str.length -1;
        id += index*(Math.pow(base, power));
        str = str.substring(1);
    }
    return id;
}

module.exports.encode = encode;
module.exports.decode = decode;
