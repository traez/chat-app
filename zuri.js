(function () {
  /* variables to select elements from the DOM */
  const clear = document.querySelector("#clear");
  const section = document.querySelector("section");
  const textarea = document.querySelector("textarea");
  const editSubmit = document.querySelector("#editSubmit");
  const submit = document.querySelector("#submit");
  const username = document.querySelector("#username");

  /* Initialize variables */
  let contentArray = localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [];

  let editIndex;

  /* Add event listener to submit button to create a new chat card */
  submit.addEventListener("click", function () {
    let chatEntryInfo = {
      chatEntry: textarea.value,
      timeStamp: `${new Date().toLocaleTimeString()} ${new Date().toDateString()}`
    };

    // Add the chat message object to the content array and save it to local storage
    contentArray.push(chatEntryInfo);
    localStorage.setItem("items", JSON.stringify(contentArray));

    // Call the function to create a chat card for the new message
    ccMaker(contentArray[contentArray.length - 1], contentArray.length - 1);

    // Clear the textarea and reload the page
    textarea.value = "";
    window.location.reload();
  });

  /* Start Code to save and retrieve username........................................ */
  /* Retrieve saved username from local storage */
  const inputValue = localStorage.getItem("inputValue");

  // If there's an existing inputValue in local storage, set the value of username to it
  if (inputValue) {
    username.value = inputValue;
  }
  /* Save the input value of the username input element after a delay */
  let timer;
  username.addEventListener("change", function (event) {
    clearTimeout(timer);
    timer = setTimeout(function () {
      localStorage.setItem("inputValue", event.target.value);
    }, 2000);
  });
  /* End Code to save and retrieve username........................................ */

  /* On window load Create chat cards for existing chat messages in the content array */
  contentArray.forEach((cont) => {
    ccMaker(cont);
  });

  /* Define function to create a new chat card */
  function ccMaker(entry) {
    // Create new DOM elements for the chat card
    const chatCard = document.createElement("div");
    const chat = document.createElement("h3");
    const usern = document.createElement("h4");
    const timeS = document.createElement("h5");
    const editButton = document.createElement("button");
    const delButton = document.createElement("button");

    // Set class names and text content for the new elements
    chatCard.className = "chatcarddiv";
    chat.className = "chath3";
    usern.className = "usernh4";
    timeS.className = "timesh5";
    editButton.className = "edit";
    delButton.className = "delete";

    usern.textContent = inputValue;
    chat.textContent = entry.chatEntry;
    timeS.textContent = entry.timeStamp;
    editButton.textContent = "edit";
    delButton.textContent = "delete";

    // Add new elements to the chat card div and the section of the page
    chatCard.appendChild(chat);
    chatCard.appendChild(usern);
    chatCard.appendChild(timeS);
    chatCard.appendChild(editButton);
    chatCard.appendChild(delButton);
    section.appendChild(chatCard);
  }

  /* Clear all chat messages from local storage and the page */
  clear.addEventListener("click", () => {
    localStorage.removeItem("items");
    section.innerHTML = "";
    contentArray = [];
  });

  /* Add event listeners to edit buttons to prepare for editing a chat message */
  let edits = document.querySelectorAll(".edit");
  edits.forEach((element, index) => {
    element.addEventListener("click", () => {
      editIndex = index;
      editSubmit.classList.remove("hide");
      submit.classList.add("hide");
      textarea.value = contentArray[index].chatEntry;
    });
  });

  //add event listener for editSubmit button
  editSubmit.addEventListener("click", () => {
    let item = contentArray[editIndex];
    item.chatEntry = textarea.value;
    localStorage.setItem("items", JSON.stringify(contentArray));
    window.location.reload();
  });

  //add event listener for delete buttons
  let deletes = document.querySelectorAll(".delete");
  deletes.forEach((element, index) => {
    element.addEventListener("click", () => {
      contentArray.splice(index, 1);
      localStorage.setItem("items", JSON.stringify(contentArray));
      window.location.reload();
    });
  });
})();

/* 
https://codepen.io/Mo61n/pen/rNZQgwV
and
https://codepen.io/ShreyB/pen/BbgpoX
provided design inspiration
*/
