const PORT = 8082;
const MULTICAST_ADDR = "239.255.255.250";

const dgram = require("dgram");
const telnet = require('telnet-client');

const channels = require("./constants").channels;
const keys = require("./constants").keys;

var STBS = [];

const socket = dgram.createSocket({ type: "udp4", reuseAddr: true });

socket.bind(PORT);

socket.on("listening", function() 
{
    socket.addMembership(MULTICAST_ADDR);
    const address = socket.address();
    console.log(`UDP socket listening on ${address.address}:${address.port}`);
});

socket.on("message", function(message, rinfo) 
{
    var stb = new Object();

    var textToParse = String(message);

    var ipMatch = textToParse.match(/x-debug: http:\/\/(.*?):8080/i);
    
    if(ipMatch && ipMatch.length > 0)
    {
        stb.ip = ipMatch[1];
    
        var stateMatch = textToParse.match(/<tune(.*?)\/>/i)

        if(stateMatch && stateMatch.length > 0)
        {
            stb.state = "ON";

            var channelMatch = stateMatch[1].match(/5500:(.*?)'/i);

            if(channelMatch && channelMatch.length > 0)
            {
                stb.channel = channels[stateMatch[1].match(/5500:(.*?)'/i)[1]] || stateMatch[1].match(/5500:(.*?)'/i)[1];
            }
        }
        else
        {
            stb.state = "OFF";
        }

        STBS[stb.ip] = stb;
    }
});

function getState(ip)
{
    if(STBS[ip])
    {
        return STBS[ip].state || "UNKNOWN";
    }

    return "UNKNOWN";
}

function getChannel(ip)
{
    if(STBS[ip])
    {
        return STBS[ip].channel || "UNKNOWN";
    }

    return "UNKNOWN";
}

function setKey(ip, key)
{
    var n = keys[key];
    if (n === undefined) {
        return console.log('NOT MAPPED: "' + l + '"!');
    }

    var tc = new telnet();

    tc.on("connect", function(){
        tc.exec('key=' + n + '\n', function(err, response) {
            tc.end();
        });
    });
    
    // connect to server
    tc.connect({
        host: ip,
        port: 8082
    });

}

module.exports = {
    getState: getState,
    getChannel: getChannel,
    setKey: setKey
}