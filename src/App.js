import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const [inputValue, setInputValue] = useState(() => {
    const storedValue = localStorage.getItem("inputValue");
    return storedValue !== null ? storedValue : "";
  });

  const [contentArray, setContentArray] = useState(
    localStorage.getItem("items")
      ? JSON.parse(localStorage.getItem("items"))
      : []
  );

  const [chatEntry, setChatEntry] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const textareaRef = useRef(null);

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    localStorage.setItem("inputValue", newValue);
  };

  function handleSubmit() {
    const chatEntryInfo = {
      chatEntry: chatEntry,
      timeStamp: `${new Date().toLocaleTimeString()} ${new Date().toDateString()}`,
    };
    setContentArray([...contentArray, chatEntryInfo]);
    localStorage.setItem(
      "items",
      JSON.stringify([...contentArray, chatEntryInfo])
    );
    setChatEntry("");
  }

  function handleClear() {
    localStorage.removeItem("items");
    setContentArray([]);
  }

  function handleEdit(index) {
    setEditIndex(index);
  }

  function handleEditSubmit() {
    const newContentArray = [...contentArray];
    newContentArray[editIndex].chatEntry = textareaRef.current.value;
    setContentArray(newContentArray);
    localStorage.setItem("items", JSON.stringify(newContentArray));
    setEditIndex(null);
  }

  return (
    <main>
      <h1>Welcome to the Chat Room</h1>

      <header>
        <aside>
          <b>"Chat App" Project</b>
          <a href="https://github.com/traez/chat-app" target="_blank">
            https://github.com/traez
          </a>
        </aside>

        <label>
          Enter Username
          <input
            type="text"
            id="username"
            name="username"
            value={inputValue}
            onChange={handleInputChange}
          />
        </label>

        <nav>
          <button id="clear" type="button" onClick={handleClear}>
            Clear Chat History
          </button>
        </nav>
      </header>

      <section>
        {contentArray.map((entry, index) => (
          <div className="chatcarddiv" key={index}>
            <h3 className="chath3">{entry.chatEntry}</h3>
            <h4 className="usernh4">{inputValue}</h4>
            <h5 className="timesh5">{entry.timeStamp}</h5>
            <button
              className="edit"
              onClick={() => handleEdit(index)}
              disabled={editIndex !== null}
            >
              edit
            </button>
            <button 
        className="delete"
        onClick={() => {
          const newContentArray = [...contentArray];
          newContentArray.splice(index, 1);
          setContentArray(newContentArray);
          localStorage.setItem("items", JSON.stringify(newContentArray));
        }}
      >
        delete
      </button>
          </div>
        ))}
      </section>

      <footer>
        <textarea
          rows="6"
          placeholder="Chat Box. Type here..."
          value={editIndex === null ? chatEntry : contentArray[editIndex].chatEntry}
          onChange={(e) =>
            editIndex === null
              ? setChatEntry(e.target.value)
              : setContentArray(
                  contentArray.map((entry, i) =>
                    i === editIndex
                      ? { ...entry, chatEntry: e.target.value }
                      : entry
                  )
                )
          }
          ref={textareaRef}
        ></textarea>

        <div id="div-footer">
          <button
            id="editSubmit"
            className={editIndex === null ? "hide" : ""}
            type="button"
            onClick={handleEditSubmit}
          >
            Edit-Submit
          </button>
          <button
            id="submit"
            type="button"
            onClick={handleSubmit}
            disabled={editIndex !== null}
          >
            Submit
          </button>
        </div>
      </footer>
    </main>
  );
}

/* 
Print the sorted array to display the frequency count of each word
*/
