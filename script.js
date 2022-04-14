const dataEntry = document.querySelector("#form");

dataEntry.addEventListener("submit", (e) => {
  const rawitem = document.querySelector("#produto");
  const item = rawitem.value;
  addToList(item);
  closeModal()
});

let itemList = [];
let CheckedItem = [];
let totalValues = 0;

//recupera dados do loval storage no load dapagina
if (JSON.parse(localStorage.getItem("itemList"))){
  itemList = JSON.parse(localStorage.getItem("itemList"));
}else localStorage.setItem("itemList", JSON.stringify(itemList))
  
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

//cria elementos conforme os items são adicionados
function updateListView() {
  const container = document.getElementById("itemList");

  container.innerHTML = "";
  console.log(itemList)
  itemList.forEach(function (task) {
    const itemContainer = document.createElement("div");
    itemContainer.className = "task";
    itemContainer.id = itemList.indexOf(task);

    const taskLabel = document.createElement("span");
    taskLabel.className = "taskLabel";
    taskLabel.textContent = task.name;

    const delBtn = document.createElement("button");
    delBtn.className = "deleteItemBtn";
    delBtn.textContent = " X ";
    delBtn.onclick = deleteThisItem;
    delBtn.style.cursor = 'pointer'

    const checkbox = document.createElement("input");
    checkbox.className = "taskCheckbox";
    checkbox.id = itemList.indexOf(task);
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.onclick = checkTask;

    itemContainer.appendChild(checkbox);
    itemContainer.appendChild(taskLabel);
    itemContainer.appendChild(delBtn);
    container.appendChild(itemContainer);
  });
  purchaseValue();
}

/*função que checa se o item foi marcado, caso sim
*/
function checkTask(e) {
  let checkStatus = e.target.checked,
    task = e.target.parentElement,
    itemId = task.id,
    removed = false;
  itemList[itemId].done = checkStatus;
  purchaseValue();
  if (CheckedItem.length === 0) {
    openModal(itemId)
    CheckedItem.push(itemId);
  } else {
    CheckedItem.forEach(function (index) {
      if (itemId === index) {
        CheckedItem.splice(CheckedItem.indexOf(index), 1);
        removed = true;
      }
    });
    if (!removed) {
      openModal(itemId)
      CheckedItem.push(itemId);
      CheckedItem.sort(); // ordena todos os itens do array pelo id, não importando a ordem que foi adicionado
    }
  }
  saveLocalList();
}

//delata item selecionado do array
function deleteThisItem(e) {
  itemList.splice(e.target.parentElement.id, 1);

  saveLocalList();
  updateCompletedListArray();
  updateListView();
}

//persiste array de items no local Storage
function saveLocalList() {
  localStorage.setItem("itemList", JSON.stringify(itemList));
}


//fecha modal
function closeModal(){
  const modal = document.querySelector(".modal2");
  modal.style.opacity = "0";
  modal.style.pointerEvents = 'none'
  modal.style.cursor ='pointer'
}

function updateItemValue(id){
  const getValue = document.querySelector('.submitValue')
  getValue.addEventListener('click', () => {
    const rawvalue = document.querySelector(".inputValue");
    const item = parseFloat(rawvalue.value)
    if(isNaN(item)){
      alert('O valor inserido é inválido! Digite apenas números!')
    }else{
      
      addValue(id, item)
      purchaseValue()
    }
  })
}
 
  function purchaseValue() {
    let total = itemList.reduce((total, item) => total + item.price, 0)
    let valor = document.querySelector(".value");
    valor.innerHTML = `R$ ${total}`;
  }

  function openModal (id){
    const modal = document.querySelector(".modal2");
    modal.style.opacity = "1";
    modal.style.pointerEvents = 'auto'
    updateItemValue(id)
  }

  function addValue (id, item) {
    for(let i of itemList){
      if(itemList[i] != id){
        console.log('passou aqui  ')
      }else{
        itemList[id].price = item
      }
    }
  }
  

  


  
  