async function addVegetable() {
    const name = document.getElementById("name").value;
    const price = parseFloat(document.getElementById("price").value);
    const quantity = parseFloat(document.getElementById("quantity").value);
    const total = price * quantity;
  
    const response = await fetch('https://crudcrud.com/api/d5130f3fed404b40874ffb4dc5126df7/vegetables', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, price, quantity, total })
    });
  
    if (response.ok) {
      const vegetable = await response.json();
      displayVegetable(vegetable);
      updateTotalItems();
    } else {
      alert('Failed to add vegetable');
    }
  }
  
  async function getVegetables() {
    const response = await fetch('https://crudcrud.com/api/d5130f3fed404b40874ffb4dc5126df7/vegetables');
    if (response.ok) {
      const vegetables = await response.json();
      vegetables.forEach(vegetable => displayVegetable(vegetable));
      updateTotalItems();
    } else {
      alert('Failed to retrieve vegetables');
    }
  }
  
  async function deleteVegetable(id) {
    const response = await fetch(`https://crudcrud.com/api/d5130f3fed404b40874ffb4dc5126df7/vegetables/${id}`, {
      method: 'DELETE'
    });
  
    if (response.ok) {
      document.getElementById(id).remove();
      updateTotalItems();
    } else {
      alert('Failed to delete vegetable');
    }
  }
  
  async function buyVegetable(id) {
    const response = await fetch(`https://crudcrud.com/api/d5130f3fed404b40874ffb4dc5126df7/vegetables/${id}`, {
      method: 'DELETE'
    });
  
    if (response.ok) {
      document.getElementById(id).remove();
      updateTotalItems();
    } else {
      alert('Failed to buy vegetable');
    }
  }
  
  async function updateQuantity(id, newQuantity) {
    const response = await fetch(`https://crudcrud.com/api/d5130f3fed404b40874ffb4dc5126df7/vegetables/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity: newQuantity })
    });
  
    if (response.ok) {
      const vegetableItem = document.getElementById(id);
      const quantityElement = vegetableItem.querySelector(`#quantity-${id}`);
      quantityElement.innerText = `Quantity (Kgs): ${newQuantity}`;
      updateTotalItems();
    } else {
      alert('Failed to update quantity');
    }
  }
  
  function displayVegetable(vegetable) {
    const vegetableList = document.getElementById("vegetableList");
    const item = document.createElement("div");
    item.className = "vegetable-item";
    item.id = vegetable._id;
    item.innerHTML = `
      <div>Name: ${vegetable.name}</div>
      <div>Price per Kg: ${vegetable.price}</div>
      <div id="quantity-${vegetable._id}">Quantity (Kgs): ${vegetable.quantity}</div>
      <div>Total Price: ${vegetable.total}</div>
      <div>
        <input type="number" id="newQuantity-${vegetable._id}" placeholder="New Quantity">
        <button onclick="updateQuantity('${vegetable._id}', parseFloat(document.getElementById('newQuantity-${vegetable._id}').value))">Update Quantity</button>
        <button onclick="buyVegetable('${vegetable._id}')">Buy</button>
        <button onclick="deleteVegetable('${vegetable._id}')">Delete</button>
      </div>
    `;
    vegetableList.appendChild(item);
  }
  
  async function updateTotalItems() {
    const response = await fetch('https://crudcrud.com/api/d5130f3fed404b40874ffb4dc5126df7/vegetables');
    if (response.ok) {
      const vegetables = await response.json();
      document.getElementById('totalItems').innerText = `Total Items: ${vegetables.length}`;
    } else {
      alert('Failed to update total items');
    }
  }
  
  getVegetables();
  
  