import { useState } from "react";
import axios from "axios";

export default function DepartmentForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/departments/", {
        name,
        description,
      });
      alert("Department created!");
    } catch (err) {
      console.error(err);
      alert("Error creating department");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Department Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
