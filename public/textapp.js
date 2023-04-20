import { useState, useEffect } from 'react';

function Chat() {
  /* variables to select elements from the DOM */
  const [contentArray, setContentArray] = useState(() => {
    const storedArray = localStorage.getItem("items");
    return storedArray ? JSON.parse(storedArray) : [];
  });

  const [editIndex, setEditIndex] = useState(null);
  const [inputValue, setInputValue] = useState(() => {
    return localStorage.getItem("inputValue") ?? "";
  });
  const [chatEntry, setChatEntry] = useState("");

  /* Add event listener to submit button to create a new chat card */
  const handleChatSubmit = (event) => {
    event.preventDefault();
    const chatEntryInfo = {
      chatEntry: chatEntry,
      timeStamp: `${new Date().toLocaleTimeString()} ${new Date().toDateString()}`
    };

    // Add the chat message object to the content array and save it to local storage
    setContentArray([...contentArray, chatEntryInfo]);
    localStorage.setItem("items", JSON.stringify([...contentArray, chatEntryInfo]));

    // Clear the textarea and set chatEntry to empty
    setChatEntry("");
  };

  /* Save the input value of the username input element after a delay */
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("inputValue", inputValue);
    }, 2000);
    return () => clearTimeout(timer);
  }, [inputValue]);

  /* Create chat cards for existing chat messages in the content array */
  useEffect(() => {
    const chats = contentArray.map((chat, index) => (
      <ChatCard
        key={index}
        chat={chat}
        username={inputValue}
        onEdit={() => setEditIndex(index)}
        onDelete={() => {
          setContentArray(contentArray.filter((_, i) => i !== index));
          localStorage.setItem("items", JSON.stringify(contentArray.filter((_, i) => i !== index)));
        }}
      />
    ));
    return () => {
      // Clear all chat messages from local storage
      localStorage.removeItem("items");
    };
  }, [contentArray, inputValue]);

  /* Define function to create a new chat card */
  const ChatCard = ({ chat, username, onEdit, onDelete }) => {
    return (
      <div className="chatcarddiv">
        <h3 className="chath3">{chat.chatEntry}</h3>
        <h4 className="usernh4">{username}</h4>
        <h5 className="timesh5">{chat.timeStamp}</h5>
        <button className="edit" onClick={onEdit}>edit</button>
        <button className="delete" onClick={onDelete}>delete</button>
      </div>
    );
  };

  return (
    <div>
      <form onSubmit={handleChatSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <label htmlFor="chat">Chat:</label>
        <textarea
          id="chat"
          value={chatEntry}
          onChange={(event) => setChatEntry(event.target.value)}
        ></textarea>
        <button type="submit" id="submit">Submit</button>
      </form>
      <button id="clear" onClick={() => setContentArray([])}>Clear all</button>
      {contentArray.map((chat, index) => (
        <ChatCard
          key={index}
          chat={chat}
          username={inputValue}
          onEdit={() => setEditIndex(index)}
          onDelete={()
