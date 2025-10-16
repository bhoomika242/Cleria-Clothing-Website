// js/cart.js
class ShoppingCart {
    constructor() {
        this.items = this.loadCart();
    }

    // Load cart from localStorage
    loadCart() {
        const cart = localStorage.getItem('shoppingCart');
        return cart ? JSON.parse(cart) : [];
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(this.items));
    }

    // Add item to cart
    addItem(productId, name, price, quantity = 1, image) {
        const existingItem = this.items.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: productId,
                name: name,
                price: price,
                quantity: quantity,
                image: image
            });
        }
        
        this.saveCart();
        this.updateCartIcon();
    }

    // Remove item from cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartIcon();
    }

    // Update item quantity
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.saveCart();
            }
        }
        this.updateCartIcon();
    }

    // Get cart total
    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get item count for cart icon
    getItemCount() {
        return this.items.reduce((count, item) => count + item.quantity, 0);
    }

    // Update cart icon on all pages
    updateCartIcon() {
        const count = this.getItemCount();
        const cartIcons = document.querySelectorAll('.cart-count');
        cartIcons.forEach(icon => {
            icon.textContent = count;
            icon.style.display = count > 0 ? 'flex' : 'none';
        });
    }

    // Clear cart
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartIcon();
    }
}

// Initialize cart - this makes it available globally
const cart = new ShoppingCart();