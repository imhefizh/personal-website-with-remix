import type { LoaderFunctionArgs } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { readArticles } from "db";

export const loader = async ({
    params,
}: LoaderFunctionArgs) => {
    const articles = await readArticles();

    const content = articles?.find(art => art.title == params.title)
    return {title: params.title, content: content?.content, tags:content?.tags, articles}
}

export default function Article() {
    const {title, content, tags, articles} = useLoaderData()

    return (
        <div className="text-black bg-white min-h-screen">
            <header className="w-full h-20 flex items-center font-bold text-3xl border-b border-black px-10">Articles</header>
            <div className="mt-5 px-10">
                <div className="">
                    <h1 id="title" className="font-extrabold text-4xl">{title}</h1>
                    <div className="gap-2 text-gray-500 mt-3 flex items-center">
                    <p>5 min read</p>
                    <p>•</p>
                    <h3>10 May 2025</h3>
                    </div>
                </div>
                <div className="mt-5 pb-5 text-justify text-lg leading-relaxed">
                    <p id="content">{content ? content : "Can't load the Content"}</p>
                    <p id="content">{content ? content : "Can't load the Content"}</p>
                    <p id="content">{content ? content : "Can't load the Content"}</p>
                </div>
                <div id="tags" className="gap-2 flex flex-wrap">
                    {tags.map((tag, index) => (
                        <h2 key={index} className="bg-gray-300 text-gray-500 text-xl w-fit rounded-full p-1 px-4 ">
                            {tag ? tag : ""}
                        </h2>
                    ))}
                </div>
                <div className="pb-8 mt-5 w-full">
                    <div className="flex items-center">
                        <h3 className="text-2xl font-bold text-nowrap">Other Articles</h3>
                        <div className="h-[1px] ml-2 w-full bg-black">
                        </div>
                    </div>
                    {articles.map((article, index) => (
                        <Link key={index} to={`/articles/${encodeURIComponent(article.title)}`}>
                <div id="article-card" className={`${index < 3 == true ? "" : "hidden"} mt-3 border border-black black w-full h-auto rounded-md p-3`}>
                    <h2 className="font-semibold text-lg leading-tight">{article.title}</h2>
                    <p className="text-xs mt-3 line-clamp-2">{article.content}</p>
                    <ul className="mt-4 flex gap-1 flex-wrap text-xs">
                        {article["tags"].map((tag, index) => (
                            <li key={index} className="w-fit bg-black text-white rounded-full px-2">{tag}</li>
                        ))}
                    </ul>
                </div>
                        </Link>
                ))}
                </div>
            </div>
        </div>

    )
}