import { Link, useNavigation } from "@remix-run/react";
import { useEffect, useState } from "react";

interface Props {
    datas: {
        title: string;
        content: string;
        tags: string[];
    }[][]
}

export default function Articles({datas, pageData}: Props) {
    const [show, setShow] = useState(false);
    const [screenW, setScreenW] = useState(0);
    const navigation = useNavigation();

    useEffect(() => {
        setScreenW(window.innerWidth)
    }, [])    

    return (
        <div className={`mt-8 md:w-[55%] md:mt-0 md:py-28 ${pageData == 1 ? "" : "md:hidden"}`}>
            <h1 className="font-bold text-2xl md:text-3xl">Articles</h1>
            <div className="flex flex-col">
                <p className="text-xs mt-2 md:text-base">
                    I like to write about things I&apos;ve found, learned, or anything I&apos;m curious about. You can read my articles here. I hope they help you learn something, or maybe we can even discuss it together.
                </p>
                {datas?.map((article, index) => (
                <Link to={`/articles/${encodeURIComponent(article.title)}`} key={index} id="article-card" className={`${index < 3 || show == true || screenW > 768 ? "" : "hidden"} mt-3 border border-white w-full h-auto rounded-md p-3`}>
                    <div className={`${navigation.state == "loading" && navigation.location.pathname == `/articles/${encodeURIComponent(article.title)}` ? "" : "hidden"} flex space-x-2 justify-center items-center dark:invert h-[7rem]`}>
                        <div className='h-3 w-3 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                        <div className='h-3 w-3 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                        <div className='h-3 w-3 bg-white rounded-full animate-bounce'></div>
                    </div>
                    <div className={`${navigation.state == "loading" && navigation.location.pathname == `/articles/${encodeURIComponent(article.title)}` ? "hidden" : ""} `}>
                        <h2 className="font-semibold text-lg leading-tight md:text-xl">{article.title}</h2>
                        <div className="text-xs mt-3 line-clamp-2 md:text-base" dangerouslySetInnerHTML={{ __html: article.content }}></div>
                        <ul className="mt-4 flex gap-1 flex-wrap text-xs">
                            {article["tags"].map((tag, index) => (
                                <li key={index} className="w-fit bg-white text-black rounded-full px-2">{tag}</li>
                            ))}
                        </ul>
                    </div>
                </Link>
                ))}
                <button className="pt-5 tablet:hidden flex items-center gap-1 w-full justify-center md:hidden" onClick={() => setShow((prev) => !prev)}>
                    <div className="bg-white w-5 h-[2px]"></div>
                    <p className="text-xs">{show == false ? "Show more" : "Show less"}</p>
                    <div className="bg-white w-5 h-[2px]"></div>
                </button>
            </div>
        </div>
    )
}