function displayCars() {
    const carGrid = document.getElementById('home-car-grid');
    
    // Get data from localStorage
    const cars = JSON.parse(localStorage.getItem('autoWorldCars')) || [];

    // FIX: Check if carGrid exists before trying to edit it (prevents console errors)
    if (!carGrid) return;

    if (cars.length === 0) {
        carGrid.innerHTML = "<p style='grid-column: 1/-1; text-align: center;'>No cars available. Add some in the Admin panel!</p>";
        return;
    }

    carGrid.innerHTML = cars.map(car => `
        <div class="car-card">
            <img src="${car.img}" alt="${car.name}">
            <div class="car-info">
                <h3>${car.name}</h3>
                <p>${car.info}</p>
            </div>
        </div>
    `).join('');
}

// FIX: Listen for 'storage' events. 
// This makes the Home page update in real-time if you add/delete cars in the Admin tab.
window.addEventListener('storage', (e) => {
    if (e.key === 'autoWorldCars') {
        displayCars();
    }
});

// Run when page loads
window.onload = displayCars;