document.addEventListener('DOMContentLoaded', () => {
  // show last modified (if element exists)
  const lastModifiedEl = document.getElementById('lastModified');
  if (lastModifiedEl) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const formatted = new Date(document.lastModified).toLocaleString('en-US', options);
    lastModifiedEl.textContent = `Last Updated: ${formatted}`;
  }

  const products = [
    { id: "fc-1888", name: "Flux Capacitor", averagerating: 4.5 },
    { id: "fc-2050", name: "Power Laces", averagerating: 4.7 },
    { id: "fs-1987", name: "Time Circuits", averagerating: 3.5 },
    { id: "ac-2000", name: "Low Voltage Reactor", averagerating: 3.9 },
    { id: "jj-1969", name: "Warp Equalizer", averagerating: 5.0 }
  ];

  const productNameSelect = document.getElementById('productName');
  if (productNameSelect) {
    products.forEach(product => {
      const option = document.createElement('option');
      option.value = product.id;
      option.textContent = product.name;
      productNameSelect.appendChild(option);
    });
  }
});

