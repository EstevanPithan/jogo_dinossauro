const personagem = document.querySelector('.personagem')
const background = document.querySelector('.background')
const game = document.querySelector('#game')

let isJumping = false
let position = 0
let isGameOver = false

function recomecarjogo() {
  isGameOver = false
  game.innerHTML =
    '<section class="flex-container" id="game"><div class="background"><div class="fundo"></div><div class="personagem"></div></div></section>'
}

function handleKeyPress(event) {
  if (event.keyCode === 32 && !isJumping && !isGameOver) {
    jump()
    console.log('Pula ')
  }
}

function jump() {
  isJumping = true

  let upInterval = setInterval(() => {
    if (position >= 160) {
      clearInterval(upInterval)

      let downInterval = setInterval(() => {
        if (position <= 0) {
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
  let obstaclePosition = 500
  const obstacle = document.createElement('div')
  let randomTime = Math.random() * 6000

  if (isGameOver) return console.log('jogo acabou')

  obstacle.classList.add('obstacle')
  background.appendChild(obstacle)
  obstacle.style.left = 500 + 'px'

  let leftInterval = setInterval(() => {
    if (obstaclePosition < -500) {
      clearInterval(leftInterval)
      background.removeChild(obstacle)
    } else if (obstaclePosition > 0 && obstaclePosition < 45 && position < 60) {
      clearInterval(leftInterval)
      isGameOver = true
      game.innerHTML =
        '<div class="game-over"><h1>Fim de Jogo!!!</h1><button class="btn" onclick="recomecarjogo()" >Recomeçar?</button></div>'
    } else {
      obstaclePosition -= 10
      obstacle.style.left = obstaclePosition + 'px'
    }
  }, 20)
  setTimeout(createObstacle, randomTime)
}

createObstacle()

document.addEventListener('keypress', handleKeyPress)
