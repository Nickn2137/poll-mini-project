import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc, increment, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase";

const ResponseList = ({ refreshTrigger }) => {
  const [responses, setResponses] = useState([]);

  const fetchResponses = async () => {
    const q = query(collection(db, "responses"), orderBy("upvotes", "desc"));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setResponses(data);
  };

  const handleUpvote = async (id) => {
    const ref = doc(db, "responses", id);
    await updateDoc(ref, { upvotes: increment(1) });
    fetchResponses();
  };

  useEffect(() => {
    fetchResponses();
  }, [refreshTrigger]); // Dependency array

  return (
    <ul>
      {responses.map((r) => (
        <li key={r.id}>
          {r.text} – {r.upvotes} upvotes
          <button onClick={() => handleUpvote(r.id)}>Upvote</button>
        </li>
      ))}
    </ul>
  );
};

export default ResponseList;
