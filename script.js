let carrinho = [];

function adicionar(nome, preco) {
    const produtoExistente = carrinho.find(produto => produto.nome === nome);

    if (produtoExistente) {
        produtoExistente.quantidade++;
    } else {
        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });
    }

    atualizarCarrinho();
    abrirCarrinho();
}

function atualizarCarrinho() {
    const lista = document.getElementById("lista-carrinho");
    const contador = document.getElementById("contador-carrinho");
    const totalElemento = document.getElementById("total-carrinho");

    lista.innerHTML = "";

    let total = 0;
    let quantidadeTotal = 0;

    carrinho.forEach((produto, indice) => {
        const subtotal = produto.preco * produto.quantidade;

        total += subtotal;
        quantidadeTotal += produto.quantidade;

        const item = document.createElement("div");
        item.className = "item-carrinho";

        item.innerHTML = `
            <div>
                <strong>${produto.nome}</strong>
                <p>R$ ${produto.preco.toFixed(2).replace(".", ",")} cada</p>

                <div class="controle-quantidade">
                    <button onclick="diminuirQuantidade(${indice})">−</button>

                    <span>${produto.quantidade}</span>

                    <button onclick="aumentarQuantidade(${indice})">+</button>
                </div>
            </div>

            <div class="item-direita">
                <strong>
                    R$ ${subtotal.toFixed(2).replace(".", ",")}
                </strong>

                <button onclick="removerProduto(${indice})">
                    Remover
                </button>
            </div>
        `;

        lista.appendChild(item);
    });

    contador.textContent = quantidadeTotal;

    totalElemento.textContent =
        "R$ " + total.toFixed(2).replace(".", ",");
}

function aumentarQuantidade(indice) {
    carrinho[indice].quantidade++;
    atualizarCarrinho();
}

function diminuirQuantidade(indice) {
    if (carrinho[indice].quantidade > 1) {
        carrinho[indice].quantidade--;
    } else {
        carrinho.splice(indice, 1);
    }

    atualizarCarrinho();
}

function removerProduto(indice) {
    carrinho.splice(indice, 1);
    atualizarCarrinho();
}

function abrirCarrinho() {
    document.getElementById("carrinho").classList.add("aberto");
}

function fecharCarrinho() {
    document.getElementById("carrinho").classList.remove("aberto");
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    let mensagem = "Olá! 🌙 Quero fazer um pedido na Almas da Lua:\n\n";

    let total = 0;

    carrinho.forEach((produto, indice) => {
        const subtotal = produto.preco * produto.quantidade;

        mensagem +=
            `${indice + 1}. ${produto.nome} - ${produto.quantidade}x - R$ ${subtotal.toFixed(2).replace(".", ",")}\n`;

        total += subtotal;
    });

    mensagem +=
        `\nTotal: R$ ${total.toFixed(2).replace(".", ",")}`;

    const numeroWhatsApp = "5561982228139";

    const link =
        "https://wa.me/" +
        numeroWhatsApp +
        "?text=" +
        encodeURIComponent(mensagem);

    window.open(link, "_blank");
}