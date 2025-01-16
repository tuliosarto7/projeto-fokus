const html = document.querySelector('html') 
const focoBt = document.querySelector('.app__card-button--foco')
const btIniciar = document.querySelector('#start-pause');
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const musicaBt = document.querySelector('#alternar-musica')
const botoes = document.querySelectorAll('.app__card-button')
const timer = document.getElementById('timer')
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const image = document.querySelector('.app__image')
const frase = document.querySelector('.app__title')
const musica = new Audio('sons/luna-rise-part-one.mp3')
const musicaPlay = new Audio('./sons/play.wav')
const musicaPause = new Audio('./sons/pause.mp3')
const beep = new Audio('./sons/beep.mp3')
const imageBotaoPlayPause = document.querySelector('.app__card-primary-butto-icon')
const tempoTela = document.getElementById('timer')
const _1500 = 1500
const _300 = 300
const _900 = 900

let tempoDecorridoEmSegundos = 1500 
let intervaloId = null

musica.loop = true

musicaBt.addEventListener('change', () => {
    if (musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})


focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    mostrarTempo()
    alterarContexto('foco')
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    mostrarTempo()
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    mostrarTempo()
   alterarContexto('descanso-longo')
   longoBt.classList.add('active')
})


function alterarContexto(contexto) {
    
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
})
    html.setAttribute('data-contexto', contexto)
    image.setAttribute('src', `imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco':
                frase.innerHTML = `Otimize sua produtividade, mergulhe no que importa`
            break;
        case 'descanso-curto':
                frase.innerHTML = `Que tal dar uma respirada? Faça uma pausa curta!`
        
            break;
        case 'descanso-longo':
                frase.innerHTML = `Hora de voltar à superfície. Faça uma pausa longa.`
    }
}


const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        beep.play()
        zerar()
        alert("Tempo finalizado")
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo(tempoDecorridoEmSegundos)
}

btIniciar.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {
    if (intervaloId) {
        musicaPause.play()
        zerar()
        return
    }
    musicaPlay.play()
    intervaloId = setInterval(contagemRegressiva, 1000)
    iniciarOuPausarBt.textContent = "Pausar"
    imageBotaoPlayPause.setAttribute('src', './imagens/pause.png')
}

function zerar() {
    iniciarOuPausarBt.textContent = "Começar"
    imageBotaoPlayPause.setAttribute('src', './imagens/play_arrow.png')
    clearInterval(intervaloId)
    intervaloId = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()