var vodafone = require('./index');

setInterval(function()
{
    var ip = "192.168.1.66";

    console.log(vodafone.getState(ip));
    console.log(vodafone.getChannel(ip));

    vodafone.setKey(ip, "p+");

}, 5000)