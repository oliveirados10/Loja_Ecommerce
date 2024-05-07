function addItem(button) {
    var quantityElement = button.parentElement.querySelector('.quantity');
    var quantity = parseInt(quantityElement.textContent);
    quantity++;
    quantityElement.textContent = quantity;
}

function removeItem(button) {
    var quantityElement = button.parentElement.querySelector('.quantity');
    var quantity = parseInt(quantityElement.textContent);
    if (quantity > 0) {
        quantity--;
        quantityElement.textContent = quantity;
    }
}

function finalizarCompra() {
    alert('Compra finalizada! Obrigado por comprar conosco.');
}

function cancelarCarrinho() {
    alert('Carrinho cancelado!');
}
