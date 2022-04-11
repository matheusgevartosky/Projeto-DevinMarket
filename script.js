
document.querySelector("#teste").addEventListener("click", function (e) {
    

    addToList(e);
    
  });
  
  const taskList = [];
    const completedTasks = [];
  
  if (JSON.parse(localStorage.getItem("taskList")))
    taskList = JSON.parse(localStorage.getItem("taskList"));
  else localStorage.setItem("taskList", JSON.stringify(taskList));
  
  updateCompletedListArray();
  updateListView();
  
  function updateCompletedListArray() {
    completedTasks = [];
  410
    taskList.forEach(function (task) {
      if (task.done) completedTasks.push(taskList.index/~,Of(task) + "");
    });
  }
  
  function addToList(task) {
    taskList.push({
      name: task,
      done: false,
    });
  
    updateListView();
  
    localStorage.setItem("taskList", JSON.stringify(taskList));
    document.querySelector("#teste").value = "";
  }
  
  function updateListView() {
    var ul = document.getElementById("taskList");
  
    ul.innerHTML = "";
  
    taskList.forEach(function (task) {
      var listItem = document.createElement("li"),
        taskLabel = document.createElement("label"),
        delBtn = document.createElement("span"),
        editBtn = document.createElement("span"),
        checkbox = document.createElement("input");
  
      listItem.className = "task";
      listItem.id = taskList.indexOf(task);
  
      taskLabel.className = "taskLabel";
      taskLabel.textContent = task.name;
      taskLabel.htmlFor = taskList.indexOf(task);
  
      delBtn.className = "deleteTaskBtn";
      delBtn.textContent = "x";
      delBtn.onclick = deleteThisTask;
  
      /*editBtn.className = "editTaskBtn";
      editBtn.textContent = "Editar";
      editBtn.onclick = editThisTask;*/
  
      checkbox.className = "taskCheckbox";
      checkbox.id = taskList.indexOf(task);
     
     pç  checkbox.type = "checkbox";
      checkbox.checked = task.done;
      checkbox.onclick = checkTask;
  
      listItem.appendChild(checkbox);
      listItem.appendChild(taskLabel);
      listItem.appendChild(delBtn);
      listItem.appendChild(editBtn);
      ul.appendChild(listItem);
    });
  }
  
  function checkTask(e) {
    var checkStatus = e.target.checked,
      task = e.target.parentElement,
      taskId = task.id,
      removed = false;
  
    taskList[taskId].done = checkStatus;
  
    if (completedTasks.length === 0) {
      completedTasks.push(taskId);
    } else {
      completedTasks.forEach(function (index) {
        if (taskId === index) {
          completedTasks.splice(completedTasks.indexOf(index), 1);
          removed = true;
        }
      });
  
      if (!removed) {
        completedTasks.push(taskId);
        completedTasks.sort();
      }
    }
  
    saveLocalList();
  }
  
  /*function editThisTask(e) {
    saveLocalList();
    updateCompletedListArray();
    updateListView();*/
  
  
  function deleteThisTask(e) {
    taskList.splice(e.target.parentElement.id, 1);
  
    saveLocalList();
    updateCompletedListArray();
    updateListView();
  }
  
  function saveLocalList() {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }