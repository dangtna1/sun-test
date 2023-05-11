class GameManager {
    private currentState: number[][]
    private magicTubes: number[]

    constructor(initState: number[][], magicTubes: number[]) {
        this.currentState = initState
        //TODO: init your game logic here
        //In this project, suppose we always have 4 tubes 
        this.magicTubes = magicTubes

        console.log('INIT GAME:')
        console.log(`Magic tubes indexes: ${magicTubes.join(', ')}`)
        this.printState()
    }

    public move(from: number, to: number): void {
        //TODO: implement your move logic here
        if (this.currentState[to].indexOf(0) !== -1) { //check if "to" tupe has less than 4 balls
            if (this.magicTubes.indexOf(from) === -1) { //normal "from" tube
                let firstBallOfFromTube = 3;
                while (this.currentState[from][firstBallOfFromTube] === 0 && firstBallOfFromTube >= 0) firstBallOfFromTube--;
                if (firstBallOfFromTube !== -1) { //has at least a ball in "from" tube    
                    const movedBall = this.currentState[from][firstBallOfFromTube]
                    //now move
                    this.currentState[from][firstBallOfFromTube] = 0
                    this.currentState[to].splice(this.currentState[to].indexOf(0), 1, movedBall)
                }

            } else { //margic "from" tube
                const movedBall = this.currentState[from][0]
                if (movedBall !== 0) { //has at least a ball in "from" tube   
                    //now move
                    for (let i = 0; i < 3; i++) {
                        this.currentState[from][i] = this.currentState[from][i+1]
                    }
                    this.currentState[from][3] = 0
                    this.currentState[to].splice(this.currentState[to].indexOf(0), 1, movedBall)
                }
            }
        }
        console.log(`MOVE FROM ${from} TO ${to}:`)
        this.printState()

        if (this.isWin()) {
            console.log("YOU WIN")
        }
    }

    public isWin(): boolean {
        return this.currentState.every(tube => {
            const firstColor = tube[0]
            for (let i = 1; i < tube.length; i++) {
                const color = tube[i]

                if (firstColor != color) return false
            }

            return true
        })
    }

    private printState(): void {
        const transposing = this.currentState[0].map((_, colIndex) => this.currentState.map(row => row[row.length - 1 - colIndex]));

        console.log(transposing.map(row => row.join('\t')).join('\n'))
    }
}

export default GameManager