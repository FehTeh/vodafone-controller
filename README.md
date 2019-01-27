# VODAFONE-CONTROLLER

The Vodafone box has a telnet interface to receive remote control commands.  
Also it sends a broadcast message with it's location and what it's playing.


## installing

    npm install vodafone-controller


## usage

Get box state ("ON", "OFF", "UNKNOWN"):

```javascript
vodafone.getState( {ip} ip )
```

Get channel:

```javascript
vodafone.getChannel( {ip} ip )
```

Send a key:

```javascript
vodafone.setKey( {ip} ip , {String} key )
```


### Mapped keys so far:

0, 1, 2, 3, 4, 5, 6, 7, 8, 9, back, ok, p+, p-, menu, up, down, left, right, options, guia tv, videoclube, gravacoes, teletext, prev, rewind, play/pause, forward, next, stop, red, green, yellow, blue, switchscreen, i, mute, v-, v+, record, power


### ToDo

- Sometimes the box stops broadcasting for a while. There must be another way.
- Get what's playing in that channel.