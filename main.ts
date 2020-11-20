function startAlermActivity () {
    runAlerm()
    continuesAlerm = true
    while (continuesAlerm) {
        continuesAlerm = startShakeActivity()
    }
    stopAlerm()
}
function runAlerm () {
    basic.showIcon(IconNames.Angry)
}
function stopAlerm () {
    basic.showIcon(IconNames.Happy)
}
input.onButtonPressed(Button.A, function () {
    startAlermActivity()
})
function startShakeActivity () {
    preZ = input.acceleration(Dimension.Z)
    basic.pause(1000)
    if (Math.abs(preZ - input.acceleration(Dimension.Z)) > 200) {
        serial.writeString("OK.")
        serial.writeValue("times", activitySuccessTimes)
        activitySuccessTimes += 1
    } else {
        activitySuccessTimes = 0
    }
    return activitySuccessTimes < TIMES_LIMIT
}
let preZ = 0
let activitySuccessTimes = 0
let continuesAlerm = false
let TIMES_LIMIT = 0
TIMES_LIMIT = 10
continuesAlerm = false
activitySuccessTimes = 0
