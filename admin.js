let cars = JSON.parse(localStorage.getItem('autoWorldCars')) || [
    { id: 1, name: "Tesla Model S", info: "Electric • Smart", img: "https://images.unsplash.com/featured/?tesla" }
];

function renderTable() {
    const tableBody = document.getElementById('admin-car-list');
    
    // FIX: Get the stat card element to update the total count
    const totalStat = document.getElementById('stat-total');

    if (tableBody) {
        tableBody.innerHTML = cars.map(car => `
            <tr>
                <td><img src="${car.img}" width="60" height="40" style="object-fit:cover; border-radius:4px;"></td>
                <td>${car.name}</td>
                <td>${car.info}</td>
                <td><button class="delete-btn" onclick="deleteCar(${car.id})">Delete</button></td>
            </tr>
        `).join('');
    }

    // FIX: Update the text inside the stat card to match current car count
    if (totalStat) {
        totalStat.innerText = `Total Cars: ${cars.length}`;
    }

    localStorage.setItem('autoWorldCars', JSON.stringify(cars));
}

function addCar() {
    const name = prompt("Car Name:");
    const info = prompt("Details (e.g., Luxury • V8):");
    const img = prompt("Image URL (Unsplash link):");

    if (name && info && img) {
        // Using Date.now() for a unique ID is a smart move!
        cars.push({ id: Date.now(), name, info, img });
        renderTable();
    }
}

function deleteCar(id) {
    // Added a small confirmation so you don't delete by accident
    if (confirm("Are you sure you want to delete this car?")) {
        cars = cars.filter(c => c.id !== id);
        renderTable();
    }
}

// Initial Run
renderTable();