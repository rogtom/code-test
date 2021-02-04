const lake = document.querySelectorAll("input[type=checkbox]")
const btnJump = document.querySelector('#jump');
const btnReproduce = document.querySelector('#reproduce');
const height = ['tall', 'short']
const weight = ['fat', 'slim']
const characteristics = [height[Math.floor(Math.random() * height.length)], weight[Math.floor(Math.random() * weight.length)]]


class MaleFrog {

    constructor(description, index) {
        this.sex = 'male'
        this.description = description
        this.range = 2
        this.index = index
    }
}

class FemaleFrog {
    constructor(description, index) {
        this.sex = 'female'
        this.description = description
        this.range = 1
        this.index = index
        this.checked = false
    }
}


class Game {
    constructor() {
        this.board = document.querySelectorAll('label');
        this.maleFrog = new MaleFrog(characteristics, 0);
        this.femaleFrog = new FemaleFrog(characteristics, 1);
        this.newFrog = ''
        this.jumpBtn = document.querySelector('#jump')
        this.reproduceBtn = document.querySelector('#reproduce')
        this.lake = document.querySelectorAll("input[type=checkbox]")
    }


    hideMaleFrog() {
        document.querySelectorAll('label.male').forEach(el => el.classList.remove('frog', 'male',))
    }

    hideFemaleFrog() {
        document.querySelectorAll('label.female').forEach(el => el.classList.remove('frog', 'female',))
    }

    showMaleFrog() {
        this.board[this.maleFrog.index].classList.add('frog', 'male');
    }

    showFemaleFrog() {

        this.board[this.femaleFrog.index].classList.add('frog', 'female');
    }


    maleJump(male, field, newIndex) {
        if (male.classList.contains('male') && male.querySelector('input[type=checkbox]').checked === true) {
            male.classList.remove('male', 'frog')
            if (field.querySelector('input[type=checkbox]').checked === true && field.classList.length === 0) {
                field.classList.add('frog', 'male')
                field.querySelector('input[type=checkbox]').checked = false;
                male.querySelector('input[type=checkbox]').checked = false;

            }
        }
        this.maleFrog.index = newIndex

    }

    femaleJump(female, field, newIndex) {

        if (female.classList.contains('female') && female.querySelector('input[type=checkbox]').checked === true) {
            female.classList.remove('frog', 'female')

            if (field.querySelector('input[type=checkbox]').checked === true && field.classList.length === 0) {
                field.classList.add('frog', 'female')
                field.querySelector('input[type=checkbox]').checked = false;
                female.querySelector('input[type=checkbox]').checked = false;
            }
        }
        this.femaleFrog.index = newIndex

    }

    handleJump() {

        let male = ''
        let female = ''
        let field = ''
        const board = []
        lake.forEach(el => board.push(el))

        lake.forEach(el => {
            if (el.checked === true && el.parentElement.classList.contains('male')) {
                male = el.parentElement
            }
            if (el.checked === true && el.parentElement.classList.contains('female')) {
                female = el.parentElement
            }
            if (el.checked === true && el.parentElement.classList.length === 0) {
                field = el.parentElement

            }
        })

        let newIndex = board.findIndex(el => el.checked === true && el.parentElement.classList.length === 0)



        if (this.board[this.maleFrog.index].querySelector('input').checked &&
            this.board[this.femaleFrog.index].querySelector('input').checked ||
            this.board[this.newFrog.index]?.querySelector('input').checked &&
            this.board[this.femaleFrog.index].querySelector('input').checked ||
            this.board[this.newFrog.index]?.querySelector('input').checked &&
            this.board[this.maleFrog.index].querySelector('input').checked
            ) {

            console.log('Only one frog can be selected for jump')
            male.querySelector('input[type=checkbox]').checked = false;
            female.querySelector('input[type=checkbox]').checked = false;
        } else {


            male !== '' && this.maleJump(male, field, newIndex)
            female !== '' && this.femaleJump(female, field, newIndex)


        }


    }


    Reproduce() {

        let board = []
        let maleIndexes = ''
        let femaleIndexes = ''
        lake.forEach(el => board.push(el));
        maleIndexes = board.findIndex(el => (el.parentElement.classList.contains('male') && el.checked === true))
        femaleIndexes = board.findIndex(el => (el.parentElement.classList.contains('female') && el.checked === true));

        let newFrog


        if (femaleIndexes - maleIndexes === 1 || maleIndexes - femaleIndexes === 1 || femaleIndexes - maleIndexes === 10 || maleIndexes - femaleIndexes === 10) {
            const frog = [new MaleFrog(), new FemaleFrog()]
            const randomFrog = Math.floor(Math.random() * frog.length)


            if (board[femaleIndexes + 1].parentElement.classList.length === 0) {
                frog[randomFrog].index = femaleIndexes + 1
            } else if (board[femaleIndexes - 1].parentElement.classList.length === 0) {
                frog[randomFrog].index = femaleIndexes - 1
            } else if (board[femaleIndexes + 10].parentElement.classList.length === 0) {
                frog[randomFrog].index = femaleIndexes + 10
            } else if (board[femaleIndexes - 10].parentElement.classList.length === 0) {
                frog[randomFrog].index = femaleIndexes - 10
            }


            board[frog[randomFrog].index].parentElement.classList.add('frog', `${frog[randomFrog].sex}`);
            newFrog = frog[randomFrog]

        }
        maleIndexes !== '' ? board[maleIndexes].checked = false : null
        femaleIndexes !== '' ? board[femaleIndexes].checked = false : null


        this.newFrog = newFrog

    }





    listeners() {
        this.jumpBtn.addEventListener('click', this.handleJump.bind(this))
        this.reproduceBtn.addEventListener('click', this.Reproduce.bind(this))

    }

    startGame() {
        this.hideMaleFrog()
        this.hideFemaleFrog()
        this.showMaleFrog()
        this.showFemaleFrog()
        this.listeners()
    }
}

const game = new Game()
game.startGame()





