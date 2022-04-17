


var iddomomento = null;

const dataEntry = document.querySelector(".btn");

dataEntry.addEventListener("click", () => {
  const rawitem = document.querySelector("#produto");
  const item = rawitem.value;
  console.log(item)
  if(item == ""){
    rawitem.style.opacity = "0";
    rawitem.style.pointerEvents = 'none'
    rawitem.style.cursor ='pointer'
    let messageError = document.querySelector('#emptyFormAlert')
    messageError.innerHTML = `Oopa...Você não inseriu um item!`
    document.getElementById("produto").reset()

  }else{
    rawitem.style.opacity = "0";
    rawitem.style.pointerEvents = 'none'
    rawitem.style.cursor ='pointer'
    
    let messageError = document.querySelector('#emptyFormAlert')
    messageError.innerHTML = `Parabéns, voce adicionou o item ${ item } na sua lista!`
    
    addToList(item);
    document.getElementById("produto").reset()
  }
});

let itemList = [];
let CheckedItem = [];
let totalValues = 0;
var iddomomento = ""; 

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
    price: null,
  });

  updateListView();


  localStorage.setItem("itemList", JSON.stringify(itemList));
}

//cria elementos conforme os items são adicionados
function updateListView() {
  if(itemList.length == 0){
    const container = document.getElementById("itemList");
    container.innerHTML = "Nenhum item cadastrado";
  }else{
    const container = document.getElementById("itemList");
  container.innerHTML = "";
  

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
  }
  
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
    iddomomento = itemId
    openModal(2)
    CheckedItem.push(itemId);
    
  } else {
    CheckedItem.forEach(function (index) {
      if (itemId === index ) {
        CheckedItem.splice(CheckedItem.indexOf(index));
        removed = true;
        itemList[itemId].price = null
        purchaseValue()
        updateCompletedListArray()
      }
      })
    if (!removed) {
      iddomomento = itemId
      openModal(2)
      purchaseValue()
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
function closeModal(num){
  const modal = document.querySelector(".modal" + num);
  modal.style.opacity = "0";
  modal.style.pointerEvents = 'none'
  modal.style.cursor ='pointer'
  
}



  const getValue = document.querySelector('.submitValue')
  getValue.addEventListener('click', () => {
    const rawvalue = document.querySelector(".inputValue");
    const item = parseFloat(rawvalue.value)
    
    if(isNaN(item)){
      alert('O valor inserido é inválido! Digite apenas números!')
      
    }else{
      
      itemList[iddomomento].price = item
      
      purchaseValue()
      saveLocalList();
      updateCompletedListArray();
      updateListView();
      
    }
  })

 
  function purchaseValue() {
    let total = itemList.reduce((total, item) => total + item.price, 0)
    let valor = document.querySelector(".value");
    valor.innerHTML = `R$ ${total}`;
  }

  function openModal(num){
    const modal = document.querySelector(".modal" + num);
    modal.style.opacity = "1";
    modal.style.pointerEvents = 'auto'
    
  }

  