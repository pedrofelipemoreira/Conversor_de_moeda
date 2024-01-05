/*SCRIPTS PARA A PARTE DO DROPDOWN*/

var cryptoSelected;
var inputResult = document.querySelector("#value-money");


function toggleDropdown() {
    const dropdownContent = document.getElementById("dropdownContent");
    const arrow = document.querySelector(".arrow");

    if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
        arrow.classList.remove("arrow-up");
    } else {
        dropdownContent.style.display = "block";
        arrow.classList.add("arrow-up");
    }
}

//para pesquisar as cryptos
function filterCryptos() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toUpperCase();
    const options = document.querySelectorAll('.crypto-option');

    options.forEach(option => {
        const txtValue = option.textContent || option.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            option.style.display = '';
        } else {
            option.style.display = 'none';
        }
    });
}

function selectCrypto(crypto) {
    const selectedCrypto = document.querySelector(".selected-crypto");
    const cryptoName = document.querySelector(".crypto-name");
    const cryptoIcon = document.querySelector(".crypto-icon");
    const arrow = document.querySelector(".arrow");

    // Aqui você pode fazer a lógica para mudar o ícone e nome da criptomoeda
    // Por enquanto, apenas um exemplo genérico
    switch (crypto) {
        case 'BTC':
            cryptoSelected = crypto;
            cryptoIcon.src = "./images/bitcoin.png";
            cryptoName.textContent = "Bitcoin (BTC)";
            break;

        case 'ETH':
            cryptoSelected = crypto;
            cryptoIcon.src = "./images/ethereum.png";
            cryptoName.textContent = "Ethereum (ETH)";
            break;

        case 'LTC':
            cryptoSelected = crypto;
            cryptoIcon.src = "./images/litecoin.png";
            cryptoName.textContent = "Litecoin (LTC)";
            break;

        case 'DOGE':
            cryptoSelected = crypto;
            cryptoIcon.src = "./images/dogecoin.png";
            cryptoName.textContent = "Dogecoin (DOGE)";
            break;

    }

    toggleDropdown(); // Fecha o dropdown após selecionar uma criptomoeda
}


/*SCRIPT PARA A PARTE DA LOGICA DA CONVERSÃO DA MOEDA*/


//Chamada da api para pegar o valor em tempo real na BINANCE
async function converterRealParaBitcoin(valorEmReal) {
    try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCBRL');
        const data = await response.json();

        if (data && data.price) {
            const cotacaoBitcoin = parseFloat(data.price);
            //para converter de BTC para BRL so inverter aqui
            const valorEmBitcoin = valorEmReal / cotacaoBitcoin;
            return valorEmBitcoin.toFixed(8);
        } else {
            throw new Error('Não foi possível obter a cotação atual do Bitcoin na Binance.');
        }
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        return null;
    }
}

async function converterBitcoinParaReal(valorEmReal) {
    try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCBRL');
        const data = await response.json();

        if (data && data.price) {
            const cotacaoBitcoin = parseFloat(data.price);
            //para converter de BTC para BRL so inverter aqui
            const valorEmBitcoin = cotacaoBitcoin / valorEmReal;
            return valorEmBitcoin.toFixed(2);
        } else {
            throw new Error('Não foi possível obter a cotação atual do Bitcoin na Binance.');
        }
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        return null;
    }
}

/* Exemplo de uso:

const valorEmReal = 209582.75; Insira o valor em reais que deseja converter

 converterRealParaBitcoin(valorEmReal)
    .then((resultado) => {
        if (resultado !== null) {
            console.log(`${valorEmReal} reais equivalem a aproximadamente ${resultado} bitcoins.`);
        } else {
            console.log('Não foi possível fazer a conversão.');
        }
    });
 */

window.addEventListener("load", startup, false);

async function startup() {
    valueCrypto = document.querySelector("#value-crypto");
    valueCrypto.addEventListener("input", updateFirst, false);
}


function updateFirst(event) {
    entredValue = event.target.value

    switch (cryptoSelected) {

        case 'BTC':

            converterRealParaBitcoin(entredValue)
                .then((resultado) => {
                    if (resultado !== null) {
                        inputResult.value = resultado;
                        console.log(`${entredValue} reais equivalem a aproximadamente ${resultado} bitcoins.`);
                    } else {
                        console.log('Não foi possível fazer a conversão.');
                    }
                });

            break;
    }

    if (cryptoSelected == "BTC") {



    }
    else if (cryptoSelected == "ETH") {
        converterBitcoinParaReal(entredValue)
            .then((resultado) => {
                if (resultado !== null) {
                    inputResult.value = resultado
                    console.log(`${entredValue} reais equivalem a aproximadamente ${resultado} bitcoins.`);
                } else {
                    console.log('Não foi possível fazer a conversão.');
                }
            });
    }
}