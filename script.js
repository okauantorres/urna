let seuVotoPara = document.querySelector('.d-1-1 spam'); // Selecionar HTML que irá sofrer alteração
let cargo = document.querySelector('.d-1-2 spam');
let desc = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');


let etapaAtual = 0; // Para saber que a etapaAtual sempre vai começar com 0.
let numero = ''; // Números que serão exibidos na tela



function atualizaInterface(){ // Atualiza interface, para que apareça o cargo, informações certas (após votar.)
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        } else{
            return false;
        }
    });
    if(candidato.length > 0){
        candidato = candidato[0];    
    seuVotoPara.style.display = 'block';
    cargo.innerHTML = etapa.titulo;
    desc.innerHTML = `Candidato ${candidato.nome}<br/> Partido:${candidato.partido}`;
    aviso.style.display = 'block';

    let fotosHtml = '';
    for(let i in candidato.fotos){
        fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
    }

    lateral.innerHTML = fotosHtml;
    } else{
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        desc.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
    }

}



function comecarEtapa(){ // Começa a rodar o código para que seja iniciado a votação
    let etapa = etapas[etapaAtual]; //etapa será etapas[0], ou seja, a etapa vereador no etapas.js

    let numeroHtml = '';
    numero = '';


    for(let i=0;i<etapa.numeros;i++){ //Loop para ver a quantidade de numeros que tem na etapa.numeros =  5, de acordo com etapas.js
        if(i === 0){// Quando i = 0 ou seja, primeiro número de voto, ele vai piscar
            numeroHtml += '<div class="numero pisca"></div>';
        } else{ // Quando for diferente de zero, ele vai adicionar mais uma caixa de número
            numeroHtml += '<div class="numero"></div>';
        }
    }


    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    desc.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function clicou(n){ //Função de clicar em n
    let elNumero = document.querySelector('.numero.pisca'); //Seleciona a caixa do pisca
    if(elNumero !== null){ // Se for diferente de vazio
        elNumero.innerHTML = n; 
        numero = `${numero}${n}`; // Adiciona o n a variavel numero lá em cima, com o número que estava antes + n.

        elNumero.classList.remove('pisca'); //Logo após remove o pisca
        if(elNumero.nextElementSibling !== null){ //Se a div mais próxima for diferente de nada
            elNumero.nextElementSibling.classList.add('pisca'); //Insere o pisca na div mais próxima (próxima caixa de número)
        } else {
            atualizaInterface(); // Quando já não tiver mais número pra por(ou seja, o voto foi concluido, a interface atualiza.)
        }

    }
}
function branco(){
    alert("Clicou em branco");
}
function corrige(){
console.log(numero);
}
function confirma(){
    alert("Clicou em confirma");
}

comecarEtapa();
