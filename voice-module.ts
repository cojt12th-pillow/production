const trackCategory = {
  start: 1,
  shake: [2, 3, 4],
  cheer: [5, 6],
  counter: [7, 8, 9],
  finish: 10,
}

function playVoice(track: number) {
  stopVoice();
  writeBuffer([0xAA, 0x07, 0x02, 0x00, track, track + 0xB3])
}

function pauseVoice() {
  writeBuffer([0xAA, 0x03, 0x00, 0xAD])
}

function stopVoice() {
  writeBuffer([0xAA, 0x04, 0x00, 0xAE])
}

function setVolume(volume: number) {
  writeBuffer([0xAA, 0x13, 0x01, volume, volume + 0xBE])
}

function setLoopMode(mode: number) {
  writeBuffer([0xAA, 0x18, 0x01, mode, mode + 0xC3])
}

function setLoopTimes(times: number) {
  writeBuffer([0xAA, 0x19, 0x02, 0x00, times, times + 0xC5])
}

function writeBuffer(numbers: number[]) {
  const buffer = pins.createBuffer(numbers.length)
  numbers.forEach((num, index) => buffer.setNumber(NumberFormat.UInt8BE, index, num as NumberFormat.UInt8BE))
  serial.writeBuffer(buffer)
}
