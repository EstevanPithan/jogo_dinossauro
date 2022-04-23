const personagem = document.querySelector('.personagem')
const background = document.querySelector('.background')
const game = document.querySelector('#game')
const gameOver = document.querySelector('#gameOver')
const fundo = document.querySelector('.fundo')
const body = document.querySelector('body')

let obstaculo = 'obstaculo-dino'
let isJumping = false
let position = -10
let isGameOver = false

function handleKeyPress(event) {
  if (event.keyCode === 32 && !isJumping && !isGameOver) {
    jump()
    console.log('Pula ')
  }
}

function jump() {
  isJumping = true

  let upInterval = setInterval(() => {
    if (position >= 170) {
      clearInterval(upInterval)

      let downInterval = setInterval(() => {
        if (position <= -10) {
          clearInterval(downInterval)
          isJumping = false
        } else {
          position -= 20
          personagem.style.bottom = position + 'px'
        }
      }, 20)
    } else {
      position += 20
      personagem.style.bottom = position + 'px'
    }
  }, 20)
}

function createObstacle() {
  if (isGameOver) return
  let obstaclePosition = 700
  const obstacle = document.createElement('div')
  let randomTime
  do {
    randomTime = Math.random() * 6000
  } while (randomTime < 700)

  obstacle.classList.add(obstaculo)
  background.appendChild(obstacle)
  obstacle.style.left = 700 + 'px'

  let leftInterval = setInterval(() => {
    if (obstaclePosition < -700) {
      clearInterval(leftInterval)
      background.removeChild(obstacle)
    } else if (obstaclePosition > 0 && obstaclePosition < 45 && position < 60) {
      clearInterval(leftInterval)
      isGameOver = true
      game.style.display = 'none'
      gameOver.style.display = 'flex'
      background.removeChild(obstacle)
    } else {
      obstaclePosition -= 10
      obstacle.style.left = obstaclePosition + 'px'
    }
  }, 20)
  setTimeout(createObstacle, randomTime)
}

function recomecarjogo() {
  isGameOver = false
  game.style.display = 'flex'
  gameOver.style.display = 'none'
  createObstacle()
}

function dinoImagem() {
  isGameOver = false
  body.style.backgroundColor = '#fafafa'
  fundo.style.backgroundImage = 'url(/assets/images/background-dino.png)'
  personagem.style.backgroundImage = 'url(/assets/images/dino-correndo.gif)'
  obstaculo = 'obstaculo-dino'
}

function sonicImagem() {
  isGameOver = false
  body.style.backgroundColor = '#924849'
  fundo.style.backgroundImage = 'url(/assets/images/background-sonic.png)'
  personagem.style.backgroundImage = 'url(/assets/images/sonic-correndo.gif)'
  obstaculo = 'obstaculo-sonic'
}

createObstacle()

document.addEventListener('keypress', handleKeyPress)
