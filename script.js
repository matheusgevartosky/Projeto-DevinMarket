const dataEntry = document.querySelector("#form");

dataEntry.addEventListener("submit", (e) => {
  const rawitem = document.querySelector("#produto");
  const item = rawitem.value;
  console.log(item);
  closeModal()
  addToList(item);
  
});


let itemList = [];
let CheckedItem = [];
let totalValue = 0;

if (JSON.parse(localStorage.getItem("itemList")))
  itemList = JSON.parse(localStorage.getItem("itemList"));
else localStorage.setItem("itemList", JSON.stringify(itemList));

updateCompletedListArray();
updateListView();

function updateCompletedListArray() {
  itemList.forEach(function (task) {
    if (task.done) CheckedItem.push(itemList.indexOf(task) + "");
  });
}

function addToList(task) {
  itemList.push({
    name: task,
    done: false,
    price: "",
  });

  updateListView();

  localStorage.setItem("itemList", JSON.stringify(itemList));
}

function updateListView() {
  const container = document.getElementById("itemList");

  container.innerHTML = "";

  itemList.forEach(function (task) {
    const itemContainer = document.createElement("div");
    itemContainer.className = "task";
    itemContainer.id = itemList.indexOf(task);

    const taskLabel = document.createElement("span");
    taskLabel.className = "taskLabel";
    taskLabel.textContent = task.name;

    const delBtn = document.createElement("span");
    delBtn.className = "deleteItemBtn";
    delBtn.textContent = "x";
    delBtn.onclick = deleteThisItem;

    const checkbox = document.createElement("input");
    checkbox.className = "taskCheckbox";
    checkbox.id = itemList.indexOf(task);
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.onclick = checkTask;

    itemContainer.appendChild(taskLabel);
    itemContainer.appendChild(checkbox);
    itemContainer.appendChild(delBtn);
    container.appendChild(itemContainer);
  });
  purchaseValue();
}

function checkTask(e) {

  let checkStatus = e.target.checked,
    task = e.target.parentElement,
    itemId = task.id,
    removed = false;

  itemList[itemId].done = checkStatus;
  purchaseValue();
  if (CheckedItem.length === 0) {
    const modal = document.querySelector(".modal2");
    modal.style.opacity = "1";
    modal.style.pointerEvents = 'auto'
    CheckedItem.push(itemId);
  } else {
    CheckedItem.forEach(function (index) {
      if (itemId === index) {
        CheckedItem.splice(CheckedItem.indexOf(index), 1);
        removed = true;
      }
    });
    if (!removed) {
      const modal = document.querySelector(".modal2");
      modal.style.opacity = "1";
      modal.style.pointerEvents = 'auto'
      CheckedItem.push(itemId);
      CheckedItem.sort(); // ordena todos os itens do array pelo id, não importando a ordem que foi adicionado
    }
  }
  saveLocalList();
}

function deleteThisItem(e) {
  itemList.splice(e.target.parentElement.id, 1);

  saveLocalList();
  updateCompletedListArray();
  updateListView();
}

function saveLocalList() {
  localStorage.setItem("itemList", JSON.stringify(itemList));
}

function purchaseValue() {
  let valor = document.querySelector(".value");
  valor.innerHTML = totalValue;
}

function closeModal(){
  const modal = document.querySelector(".modal2");
  modal.style.opacity = "0";
  modal.style.pointerEvents = 'none'
  modal.style.cursor ='pointer'
}
