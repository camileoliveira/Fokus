const html = document.querySelector('html');
const botaoFoco = document.querySelector('.app__card-button--foco');
const botaoCurto = document.querySelector('.app__card-button--curto');
const botaoLongo = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const musicaInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
let tempoDecorridoEmSegundo = 1500;
let intervaloId = null;
const startPauseBt = document.querySelector('#start-pause')
const somDoPlay = new Audio('/sons/play.wav');
const somDoPause = new Audio('/sons/pause.mp3');
const somDoBeep = new Audio('/sons/beep.mp3');
const inciarOuPauserBt = document.querySelector('#start-pause span');
const tempoNaTela = document.querySelector('#timer');
const mudarBotaoParaPause = document.querySelector('.app__card-primary-butto-icon');

musica.loop = true

musicaInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

botaoFoco.addEventListener('click', () => {
    tempoDecorridoEmSegundo = 1500;
    alterarContexto('foco');
    botaoCurto.classList.remove('active');
    botaoLongo.classList.remove('active');
    botaoFoco.classList.add('active');
});

botaoCurto.addEventListener('click', function () {
    tempoDecorridoEmSegundo = 300;
    alterarContexto('descanso-curto');
    botaoLongo.classList.remove('active');
    botaoFoco.classList.remove('active');
    botaoCurto.classList.add('active');

});

botaoLongo.addEventListener('click', () => {
    tempoDecorridoEmSegundo = 900;
    alterarContexto('descanso-longo');
    botaoCurto.classList.remove('active');
    botaoFoco.classList.remove('active');
    botaoLongo.classList.add('active');
});

function alterarContexto(contexto) {
    mostrarTempo();
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `

            break;

        case "descanso-longo":
            titulo.innerHTML = `
                Hora de voltar à superfície. <br>
                <strong class="app__title-strong">Faça uma pausa longa. </strong>`

            break;

        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <br> 
            <strong class="app__title-strong">Faça uma pausa curta! </strong>
            `
        default:
            break;
    }
};

const contagemRegressiva = () => {

    if (tempoDecorridoEmSegundo <= 0) {
        somDoBeep.play();
        zerarTempo();
        return
    }

    tempoDecorridoEmSegundo -= 1;
    mostrarTempo();
};

startPauseBt.addEventListener('click', iniciarOuPausaar);

function iniciarOuPausaar() {
    if (intervaloId) {
        somDoPause.play();
        zerarTempo();
        return;
    }

    somDoPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    inciarOuPauserBt.textContent = 'Pausar';
    mudarBotaoParaPause.setAttribute('src', '/imagens/pause.png');

};

function zerarTempo() {
    clearInterval(intervaloId);
    inciarOuPauserBt.textContent = 'Começar';
    mudarBotaoParaPause.setAttribute('src', '/imagens/play_arrow.png');
    intervaloId = null;


};

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundo * 1000);
    const tempoFormatado = tempo.toLocaleString('pt-Br', { minute: '2-digit', second: '2-digit' });
    tempoNaTela.innerHTML = `${tempoFormatado}`;
};

mostrarTempo();