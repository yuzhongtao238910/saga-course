const EventEmitter = require("events")
const event = new EventEmitter()

// once 只会走一次的
event.once("click", data => {
	console.log(data)
})

event.emit("click", "a")
event.emit("click", "b")
