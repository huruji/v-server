export class ResetTimeout {
  private timer: NodeJS.Timer
  constructor(private timeout:number){}

  public run(func: () => void) {
    clearTimeout(this.timer)

    this.timer = setTimeout(() => func(), this.timeout)
  }

}
