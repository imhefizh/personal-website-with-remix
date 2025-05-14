import { useEffect, useRef, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useHydrated } from "@remix-run/react";

export default function WriteArticle() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [value, setValue] = useState('');

  return (
    <>
      <div id="editor" className="rounded-sm mt-5 text-black">
        <label htmlFor="judul" className="text-white">Judul</label>
        <input
          name="judul"
          id="judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="mb-2 bg-white rounded-sm w-full"
        />

        <label htmlFor="textareaKonten" className="text-white">Konten</label>
        <ReactQuill theme="snow" value={value} onChange={setValue} />;

        <button
          onClick={() => console.log(textareaRef.current?.scrollHeight)}
          className="mt-2 border border-white px-2 rounded-md text-sm text-white"
        >
          Check
        </button>

        <p className="text-white mt-5">Preview</p>
        <div id="preview" className="bg-white w-full min-h-10 rounded-sm p-2">
          <h1 className="font-bold text-3xl">{title}</h1>
          <div>
            {content.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
