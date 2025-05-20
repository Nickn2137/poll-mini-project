import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

const ResponseForm = ({ onSubmitSuccess }) => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await addDoc(collection(db, "responses"), {
      text,
      upvotes: 0,
    });
    setText("");
    onSubmitSuccess(); // refresh list
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your response..."
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ResponseForm;
