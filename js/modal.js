//不单独使用
//显示弹出框
function showModalPopover() {
  let modal = document.getElementById("modal");
  modal.classList.add("modal-flex-center");
}

//隐藏弹出框
function hideModalPopover() {
  let modal = document.getElementById("modal");
  modal.classList.remove("modal-flex-center");
}

//创建新任务弹出框
function createAddTaskPopover() {
  const icon = "./images/modal_add_icon.svg";
  const title = "A New Task";
  createModalPopover(icon, title, "createTask()");
  showModalPopover();
}

//设置弹出框架构内容
function createModalPopover(icon, title, okBtnClickEvent, task) {
  createPopoverHeaderAndFooter(icon, title, okBtnClickEvent);
  createPopoverContent(task);
}

//设置弹出框头部和尾部内容
function createPopoverHeaderAndFooter(icon, title, okBtnClickEvent) {
  let modalIcon = document.getElementById("modalIcon");
  modalIcon.setAttribute("src", icon);
  let modalTitle = document.getElementById("modalTitle");
  modalTitle.textContent = title;
  let okBtn = document.getElementById("modalBtnOk");
  okBtn.setAttribute("onclick", okBtnClickEvent);
}

//新建任务
function createTask() {
  let taskName = document.getElementById("taskName");
  let deadline = document.getElementById("taskDeadline");
  let desc = document.getElementById("taskDesc");

  //如果输入为空，输入框变红, 函数直接返回
  if (requiredCheck([taskName, deadline, desc])) {
    return;
  }

  //若不为空则关闭弹出框，新增任务行
  let allTask = getAllTasks();
  const maxId = allTask.reduce(
    (preId, task) => (preId > task.id ? preId : task.id),
    0
  );
  let task = {
    id: maxId + 1,
    name: taskName.value,
    deadline: deadline.value,
    description: desc.value,
    status: "Active",
    createDate: new Date().getTime(),
  };

  allTask.push(task);
  saveAllTasks(allTask);
  renderPage();
  hideModalPopover();
}

//判断输入框是否为空
function requiredCheck(elements) {
  let result = false;

  elements.forEach((element) => {
    if (!element.value || element.value.trim() === "") {
      // element.classList.add("invalid-input");
      element.style["border-color"] = "red";
      result = true;
    }
  });
  return result;
}

//设置弹出框主体内容
function createPopoverContent(task) {
  let container = document.createElement("p");
  container.classList.add("text-container");

  let nameLabel = document.createElement("label");
  nameLabel.setAttribute("for", "taskName");
  nameLabel.textContent = "Name";
  container.appendChild(nameLabel);

  let nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("id", "taskName");
  nameInput.value = task ? task.name : "";
  container.appendChild(nameInput);

  let deadlineLabel = document.createElement("label");
  deadlineLabel.setAttribute("for", "taskDeadline");
  deadlineLabel.textContent = "Deadline";
  container.appendChild(deadlineLabel);

  let deadlineInput = document.createElement("input");
  deadlineInput.setAttribute("type", "text");
  deadlineInput.setAttribute("id", "taskDeadline");
  deadlineInput.value = task ? task.deadline : "";
  container.appendChild(deadlineInput);

  if (task) {
    let statusLabel = document.createElement("label");
    statusLabel.textContent = "Status";
    container.appendChild(statusLabel);

    let statusContainer = document.createElement("div");
    statusContainer.classList.add("status-container");
    container.appendChild(statusContainer);

    let activeInput = document.createElement("input");
    activeInput.setAttribute("type", "radio");
    activeInput.setAttribute("id", "active");
    activeInput.setAttribute("name", "Status");
    activeInput.setAttribute("value", "Active");
    // activeInput.checked = task.status === "Active";
    statusContainer.appendChild(activeInput);
    let activeLable = document.createElement("label");
    activeLable.textContent = "Active";
    activeLable.setAttribute("for", "active");
    statusContainer.appendChild(activeLable);

    let paddingInput = document.createElement("input");
    paddingInput.setAttribute("type", "radio");
    paddingInput.setAttribute("id", "padding");
    paddingInput.setAttribute("name", "Status");
    paddingInput.setAttribute("value", "Padding");
    // paddingInput.checked = task.status === "Padding";
    statusContainer.appendChild(paddingInput);
    let paddingLable = document.createElement("label");
    paddingLable.textContent = "Padding";
    paddingLable.setAttribute("for", "padding");
    statusContainer.appendChild(paddingLable);

    let closedInput = document.createElement("input");
    closedInput.setAttribute("type", "radio");
    closedInput.setAttribute("id", "closed");
    closedInput.setAttribute("name", "Status");
    closedInput.setAttribute("value", "Closed");
    //  closedInput.checked = task.status === "Closed";
    statusContainer.appendChild(closedInput);
    let closedLable = document.createElement("label");
    closedLable.textContent = "Closed";
    closedLable.setAttribute("for", "closed");
    statusContainer.appendChild(closedLable);

    if (task.status === "Active") {
      activeInput.setAttribute("checked", "");
    }

    if (task.status === "Padding") {
      paddingInput.setAttribute("checked", "");
    }

    if (task.status === "Closed") {
      closedInput.setAttribute("checked", "");
    }
  }

  let descLabel = document.createElement("label");
  descLabel.setAttribute("for", "taskDesc");
  descLabel.textContent = "Description";
  container.appendChild(descLabel);
  let descTextarea = document.createElement("textarea");
  descTextarea.setAttribute("id", "taskDesc");
  descTextarea.setAttribute("rows", "5");
  descTextarea.setAttribute("maxlength", "200");
  descTextarea.setAttribute(
    "placeholder",
    "Please enter task description, maximum 200 characters"
  );
  descTextarea.value = task ? task.description : "";
  container.appendChild(descTextarea);

  let modalContainer = document.getElementById("modalContainer");
  modalContainer.innerHTML = "";
  modalContainer.appendChild(container);
}
