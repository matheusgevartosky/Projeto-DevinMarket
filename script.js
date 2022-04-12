const dataEntry = document.querySelector('#form');

dataEntry.addEventListener('submit', (e) =>{
  e.preventDefault();
  const rawitem = document.querySelector('#produto')
  const item = rawitem.value
  console.log(item)
  addToList(item)
})
  
  let itemList = [];
  let CheckedItem = [];
  let valorTotal = 0
  
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
    });
  
    updateListView();
  
    localStorage.setItem("itemList", JSON.stringify(itemList));
    document.querySelector("#teste").value = "";
  }
  
  function updateListView() {
    const container = document.getElementById("itemList");
  
    container.innerHTML = "";

    itemList.forEach(function (task) {
      const itemContainer = document.createElement("div");
      itemContainer.className = "task";
      itemContainer.id = itemList.indexOf(task);

      const buttonContainer = document.createElement('div')
      buttonContainer.className = "btnContainer"
      
      const taskLabel = document.createElement("label");
      taskLabel.className = "taskLabel";
      taskLabel.textContent = task.name;
      //taskLabel.htmlFor = itemList.indexOf(task);

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
  }
  
  function checkTask(e) {
    let checkStatus = e.target.checked,
      task = e.target.parentElement,
      itemId = task.id,
      removed = false;
    itemList[itemId].done = checkStatus;
  
    if (CheckedItem.length === 0) {
      CheckedItem.push(itemId);
    } else {
      CheckedItem.forEach(function (index) {
        if (itemId === index) {
          CheckedItem.splice(CheckedItem.indexOf(index), 1);
          removed = true;
        }
      });
  
      if (!removed) {
        CheckedItem.push(itemId);
        CheckedItem.sort();
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

  const check = (e) => {
    
  }