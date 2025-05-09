import { useState } from "react";

interface Props {
    datas: {
        title: string;
        content: string;
        tags: string[];
    }[][]
}

export default function Articles({datas}: Props) {
    const [show, setShow] = useState(false);

    return (
        <div className="mt-8">
            <h1 className="font-bold text-2xl">Articles</h1>
            <div className="flex flex-col">
                <p className="text-xs mt-2">
                    I like to write about things I&apos;ve found, learned, or anything I&apos;m curious about. You can read my articles here. I hope they help you learn something, or maybe we can even discuss it together.
                </p>
                {datas.map((article, index) => (
                <div key={index} id="article-card" className={`${index < 3 || show == true ? "" : "hidden"} mt-3 border border-white w-full h-auto rounded-md p-3`}>
                    <h2 className="font-semibold text-lg leading-tight">{article.title}</h2>
                    <p className="text-xs mt-3 line-clamp-2">{article.content}</p>
                    <ul className="mt-4 flex gap-1 flex-wrap text-xs">
                        {article["tags"].map((tag, index) => (
                            <li key={index} className="w-fit bg-white text-black rounded-full px-2">{tag}</li>
                        ))}
                    </ul>
                </div>
                ))}
                <button className="pt-5 tablet:hidden flex items-center gap-1 w-full justify-center" onClick={() => setShow((prev) => !prev)}>
                    <div className="bg-white w-5 h-[2px]"></div>
                    <p className="text-xs">{show == false ? "Show more" : "Show less"}</p>
                    <div className="bg-white w-5 h-[2px]"></div>
                </button>
            </div>
        </div>
    )
}