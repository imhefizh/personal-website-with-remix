import { useEffect, useRef, useState } from "react";

export default function WriteArticle() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [tags, setTags] = useState("");

  async function dataBuilder() {
    const data = {
      title: title,
      content: html,
      tags: tags.split(" "),
      date: new Date().toUTCString().slice(0, -13),
      readTime: `${time}`,
    }

    try {
      const req = await fetch("/article/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      return req
    } catch (error) {
      console.log(error)
    }
    return
  }

  // 
  const [html, setHtml] = useState('');
  const editorRef = useRef(null);

  const handleFormat = (command) => {
    document.execCommand(command, false, null);
    updateOutput();
    editorRef.current.focus();
  };

  const handleList = (type) => {
    document.execCommand('insertUnorderedList', false, null);
    updateOutput();
    editorRef.current.focus();
  };

  const updateOutput = () => {
    if (editorRef.current) {
      setHtml(editorRef.current.innerHTML);
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.addEventListener('input', updateOutput);
      // Berikan fokus ke editor saat komponen dimuat
      editorRef.current.focus();
    }
    
    return () => {
      if (editorRef.current) {
        editorRef.current.removeEventListener('input', updateOutput);
      }
    };
  }, []);


  // 

  return (
    <>
      <div id="" className="rounded-sm mt-2 text-black">
        <label htmlFor="judul" className="text-white">Judul</label>
        <input
          name="judul"
          id="judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="mb-2 bg-white rounded-sm w-full"
        />
        <label htmlFor="tags" className="text-white">Tag</label>
        <input
          name="tags"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          type="text"
          className="mb-2 bg-white rounded-sm w-full"
        />
        <label htmlFor="time" className="text-white">Read Time</label>
        <input
          name="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          type="number"
          className="mb-2 bg-white rounded-sm w-full"
        />

        <label htmlFor="konten" className="text-white">Konten</label>
        <div id="editor" className="bg-white rounded-sm">
        <div className="flex flex-col w-full">
      {/* Toolbar */}
      <div className="flex items-center gap-2 mb-2 p-2 bg-gray-100 rounded">
        <button 
          onClick={() => handleFormat('bold')} 
          className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-200"
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button 
          onClick={() => handleFormat('italic')} 
          className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-200"
          title="Italic"
        >
          <em>I</em>
        </button>
        <button 
          onClick={() => handleList('ul')} 
          className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-200"
          title="Bullet List"
        >
          • List
        </button>
      </div>
      
      {/* Editor */}
      <div 
        ref={editorRef}
        contentEditable={true}
        className="w-full min-h-64 p-4 border border-gray-300 focus:outline-none"
        onInput={updateOutput}
      />
      
    </div>
        </div>

        <button
        onClick={() => dataBuilder()}
          className="mt-2 border border-white px-2 rounded-md text-sm text-white"
        >
          Save
        </button>

        <p className="text-white mt-5">Preview</p>
        <div id="preview" className="bg-white w-full min-h-10 rounded-sm p-2 mb-10">
          <h1 className="font-bold text-3xl">{title}</h1>
          <div className="gap-2 text-gray-500 mt-3 flex items-center">
            {title != "" && time != "" ? (
              <>
              <p>{`${time} min red`}</p>
            <p>•</p>
            <h3>{new Date().toUTCString().slice(0, -13)}</h3>
              </>
            ) : ""}
          </div>
          <div dangerouslySetInnerHTML={{ __html: html }} className="mt-5">
          </div>
          <div className={`gap-2 flex flex-wrap mt-3 ${tags.length == 0 ? "hidden" : ""}`}>
            {tags.split(" ").map((tag, index) => (
              <h2 key={index} className="bg-gray-300 text-gray-500 w-fit rounded-full p-1 px-4 ">
                  {tag ? tag : ""}
              </h2>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
