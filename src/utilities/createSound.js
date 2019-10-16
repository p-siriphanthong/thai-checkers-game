export default class {
  constructor(src) {
    this.sound = new Audio(src)
  }

  play = () => {
    this.sound.play()
  }

  stop = () => {
    this.sound.pause()
    this.sound.currentTime = 0
  }
}
