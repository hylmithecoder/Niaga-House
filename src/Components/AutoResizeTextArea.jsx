import React, { useState, useRef, useEffect } from "react";

const AutoResizeTextarea = ({ value, onChange }) => {
  const textRef = useRef(null);
  const [text, setText] = useState(value || "");

  useEffect(() => {
    adjustHeight();
  }, [text]); // Panggil tiap kali `text` berubah

  const handleChange = (e) => {
    setText(e.target.value);
    onChange(e); // Panggil `onChange` agar state di parent ikut berubah
  };

  const adjustHeight = () => {
    const textarea = textRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset tinggi dulu
      textarea.style.height = `${textarea.scrollHeight}px`; // Sesuaikan tinggi dengan konten
    }
  };

  return (
    <textarea
      ref={textRef}
      name="description"
      value={text}
      onChange={handleChange}
      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden"
      rows="1"
      style={{ minHeight: "40px" }} // Awal minimal tinggi
    />
  );
};

export default AutoResizeTextarea;
