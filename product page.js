// js/product-pages.js
document.addEventListener('DOMContentLoaded', function() {
    // Update cart count on page load
    if (typeof cart !== 'undefined') {
        cart.updateCartIcon();
    }
    
    // Add event listeners to all Add to Cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productId = productCard.dataset.productId;
            const productName = productCard.dataset.productName;
            const productPrice = parseFloat(productCard.dataset.productPrice);
            const productImage = productCard.dataset.productImage;
            
            cart.addItem(productId, productName, productPrice, 1, productImage);
            
            // Show confirmation message
            showAddedToCartMessage(productName);
        });
    });
});

function showAddedToCartMessage(productName) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <span>${productName} added to cart!</span>
        <a href="cart.html">View Cart</a>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 15px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}