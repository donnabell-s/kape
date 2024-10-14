let cakes = [
  { name: "Tiramisu Cake", price: 90 },
  { name: "Red Velvet Cake", price: 80 },
  { name: "Chocolate Cake", price: 75 },
];

let coffee = [
  { name: "Latte", price: 50 },
  { name: "Espresso", price: 45 },
  { name: "Cappuccino", price: 40 },
];

let divCoffee = document.getElementById("divCoffee");
let divCakes = document.getElementById("divCakes");
let fragCoffee = document.createDocumentFragment();
let fragCakes = document.createDocumentFragment();

let tableBody = document.getElementById("tableBody");
let fragOrders = document.createDocumentFragment();

let h3Total = document.createElement("h3");
let tdTotal = document.getElementById("totalAmount"); 

function totalAmt() {
    let classAmt = document.getElementsByClassName("amount");
    let total = 0;
    for(itemAmt of classAmt){
        total += Number(itemAmt.firstChild.innerHTML);
    }
    h3Total.innerHTML = total;
    tdTotal.appendChild(h3Total);
}

function setAmt(order, qty) {
  for (tds of order.childNodes) {
    if (tds.className == "price") {
      price = tds.firstChild.innerHTML;
    } else if (tds.className == "amount") {
      amt = tds.firstChild;
      amt.innerHTML = `${qty * price}`;
    }
  }
  totalAmt();
}

function removeOrder(order) {
  parent = order.parentNode;
  parent.removeChild(order);
}

function getQty(item) {
  for (tds of item.childNodes) {
    if (tds.className == "qty") {
      amt = tds.querySelector("input");
      amt.value = Number(amt.value) + 1;
      return amt.value;
    }
  }
}

function addOrder(addItem) {
  for (child of tableBody.childNodes) {
    if (child.id == addItem.name) {
      setAmt(child, getQty(child));
      return;
    }
  }

  let order = document.createElement("tr");
  order.setAttribute("id", addItem.name);

  let item = document.createElement("td");
  item.setAttribute("class", "item");
  let itemName = document.createElement("h3");
  itemName.innerHTML = `${addItem.name}`;
  item.appendChild(itemName);
  order.appendChild(item);

  let qty = document.createElement("td");
  qty.setAttribute("class", "qty");
  let count = document.createElement("input");
  count.setAttribute("Type", "number");
  count.setAttribute("value", 1);
  count.setAttribute("id", "count");
  let minus = document.createElement("button");
  let plus = document.createElement("button");
  minus.innerHTML = `-`;
  plus.innerHTML = `+`;
  minus.addEventListener("click", () => {
    parent = event.target.parentNode;
    for (child of parent.childNodes) {
      if (child.id == "count") {
        child.value = Number(child.value) - 1;
        if (child.value == 0) {
          removeOrder(parent.parentNode);
        } else {
          setAmt(parent.parentNode, child.value);
        }
      }
      totalAmt();
    }
  });
  plus.addEventListener("click", () => {
    parent = event.target.parentNode;
    for (child of parent.childNodes) {
      if (child.id == "count") {
        child.value = Number(child.value) + 1;
        setAmt(parent.parentNode, child.value);
      }
    }
    totalAmt();
  });
  count.addEventListener("change", () => {
    parent = event.target.parentNode;
    if (event.target.value == 0) {
      removeOrder(parent.parentNode);
    } else {
      setAmt(parent.parentNode, event.target.value);
    }
    totalAmt();
  });
  qty.appendChild(minus);
  qty.appendChild(count);
  qty.appendChild(plus);
  order.appendChild(qty);

  let price = document.createElement("td");
  price.setAttribute("class", "price");
  let itemPrice = document.createElement("h3");
  itemPrice.innerHTML = `${addItem.price}`;
  price.appendChild(itemPrice);
  order.appendChild(price);

  let amount = document.createElement("td");
  amount.setAttribute("class", "amount");
  let itemAmt = document.createElement("h3");
  amount.appendChild(itemAmt);
  order.appendChild(amount);
  setAmt(order, count.value);

  fragOrders.appendChild(order);
  tableBody.appendChild(fragOrders);
  totalAmt();
}

function makeSelection(divOption, arrOption, frag) {
  let selectOpt = document.createElement("select");
  selectOpt.multiple = true;

  if (divOption === divCoffee) {
    selectOpt.setAttribute("id", "selectCoffee");
  } else {
    selectOpt.setAttribute("id", "selectCakes");
  }

  divOption.appendChild(selectOpt);
  divOption = divOption.parentNode;

  for (let x = 0; x < arrOption.length; x++) {
    let addOption = document.createElement("option");
    addOption.text = arrOption[x].name;
    addOption.setAttribute("value", arrOption[x].name);

    addOption.addEventListener("click", () => {
      for (let item of arrOption) {
        if (item.name == event.target.value) {
          addOrder(item);
        }
      }
    });

    frag.appendChild(addOption);
  }
  selectOpt.appendChild(frag);
  selectOpt = selectOpt.parentNode;
}

makeSelection(divCoffee, coffee, fragCoffee);
makeSelection(divCakes, cakes, fragCakes);
