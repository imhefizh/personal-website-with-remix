import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { Form, Link, useLoaderData, useNavigation } from "@remix-run/react"
import { insertOneResponse, readArticles } from "db";
import { useEffect } from "react";


export const meta: MetaFunction = () => {
    const title = "Maulana Hafidz's Articles"

    return [
        { title: title},
        { name: "description", content: "Maulana Hafidz's Articles" },
    ];
};

export const loader = async ({
    params,
}: LoaderFunctionArgs) => {
    const articles = await readArticles();

    const content = articles?.find(art => art.title == params.title)
    return {title: params.title, content: content?.content, tags:content?.tags, articles, date: content?.date, readTime: content?.readTime, comments: content?.comments}
}

export const action = async ({
    request,
}: ActionFunctionArgs) => {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    const query = {
        title: data.title,
        name: data.name,
        comment: data.comment,
        date: data.date,
    }
    const req = await insertOneResponse(query)
    return req
}

export default function Article() {
    const {title, content, tags, articles, date, readTime, comments} = useLoaderData()
    const navigation = useNavigation()
    const isIdle = navigation.state == "idle"

    const getColorByIndex = (index) => {
        return colors[index % colors.length];
    };

    const colors = [
        "bg-red-500",
        "bg-orange-500",
        "bg-amber-500",
        "bg-yellow-500",
        "bg-lime-500",
        "bg-green-500",
        "bg-emerald-500",
        "bg-teal-500",
        "bg-cyan-500",
        "bg-sky-500",
        "bg-blue-500",
        "bg-indigo-500",
        "bg-violet-500",
        "bg-purple-500",
        "bg-fuchsia-500",
        "bg-pink-500",
        "bg-rose-500",
        "bg-neutral-500",
        "bg-zinc-500",
        "bg-stone-500"
      ];

    useEffect(() => {
        if (isIdle) {
            document.getElementById('name').value = ""
            document.getElementById('comment').value = ""
        }
    }, [isIdle])

    return (
        <div className="text-black bg-gray-100 min-h-screen md:absolute md:w-screen md:left-0 md:flex md:justify-center">
            <div className="max-w-screen-xl bg-white">
            <header className="justify-between w-full h-20 flex items-center font-bold text-3xl border-b border-black px-10">
                <h2>Articles</h2>
                <div className="">
                    <div role="status">
                        <svg aria-hidden="true" className={`w-8 h-8 text-gray-200 animate-spin fill-black ${navigation.state == "loading" ? "" : "hidden"}`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                    </div>
                    <Link to='/'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${navigation.state == "loading" ? "hidden" : ""} size-8`}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                    </svg>
                    </Link>
                </div>
            </header>
            <div className="mt-5 px-10">
                <div className="">
                    <h1 id="title" className="font-extrabold text-4xl">{title}</h1>
                    <div className="gap-2 text-gray-500 mt-3 flex items-center">
                    <p>{`${readTime} min read`}</p>
                    <p>•</p>
                    <h3>{date}</h3>
                    </div>
                </div>
                <div className="mt-5 pb-5 text-justify text-lg leading-relaxed">
                    <p id="content" dangerouslySetInnerHTML={{ __html: content }}></p>
                </div>
                <div id="tags" className="gap-2 flex flex-wrap">
                    {tags?.map((tag, index) => (
                        <h2 key={index} className="bg-gray-300 text-gray-500 text-base w-fit rounded-full p-1 px-4 ">
                            {tag ? tag : ""}
                        </h2>
                    ))}
                </div>
                <div className="pb-8 mt-5 w-full flex flex-col md:flex-row md:justify-between gap-5">
                    <div className="md:w-[60%] h-auto">
                        <div id="write-response">
                        <div className="flex items-center"> 
                            <h3 className="text-2xl font-bold text-nowrap">What is your thought?</h3>
                            <div className="h-[1px] ml-2 w-full bg-black md:hidden">
                            </div>
                        </div>
                        <div id="commenting" className="mt-3 flex flex-col gap-2 h-auto bg-gray-100 rounded-lg py-3 px-3">
                            <Form method="post" className="flex flex-col h-auto w-full items-start">
                                <label htmlFor="name">Name:</label>
                                <input name="name" id="name" type="text" className="rounded-sm p-1 w-full" />
                                <label htmlFor="comment" className="mt-1">Response:</label>
                                <textarea name="comment" id="comment" className="w-full p-1" />
                                <input type="hidden" name="title" value={title} />
                                <input type="hidden" name="date" value={new Date().toUTCString().slice(0, -13)} />
                                <div className="flex justify-end w-full">
                                    <button className={`mt-3 font-bold border text-sm border-black rounded-full w-fit px-2 ${navigation.state == "submitting" ? "" : "hover:text-white hover:bg-black"}`} type="submit">
                                    <p className={`${navigation.state == "submitting" ? "hidden" : "hover:text-white hover:bg-black"}`}>
                                        Respond
                                    </p>
                                    <div className={`${navigation.state == "submitting" ? "" : "hidden"} flex space-x-1 justify-center items-center h-fit rounded-full px-4 py-2`}>
                                    <div className='h-1 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                                    <div className='h-1 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                                    <div className='h-1 w-2 bg-black rounded-full animate-bounce'></div>
                                </div>
                                    </button>
                                </div>
                            </Form> 
                        </div>    
                        </div>
                        <div>
                        <div className="flex items-center mt-5"> 
                            <h3 className="text-2xl font-bold text-nowrap">Other Responses</h3>
                            <div className="h-[1px] ml-2 w-full bg-black md:hidden">
                            </div>
                        </div>
                        <p className={`w-full text-center mt-4 md:h-full ${comments?.length > 0 ? "hidden" : ""}`}>No one responding yet</p>
                        {comments?.map((comment, index) => {
                            return(
                            <div key={index} id="comment-card" className="mt-2 flex flex-col gap-2 bg-gray-100 rounded-lg py-3 px-3">
                            <div id="head" className="flex items-center gap-2">
                                <div className={`h-10 w-10 ${getColorByIndex(index)} overflow-hidden rounded-full text-white font-bold flex items-center justify-center`}>
                                    {comment.name[0]}
                                </div>
                                <div className="flex flex-col py-1">
                                    <h4 className="text-lg font-bold -mt-1">{comment.name}</h4>
                                    <p className="text-gray-500 text-xs">{comment.date}</p>
                                </div>
                            </div>
                            <div id="main">
                            <p>{comment.comment}</p>
                            </div>
                        </div>
                        )})}
                        </div>
                    </div>
                    <div className="md:w-[40%]">
                        <div className="flex items-center"> 
                        <h3 className="text-2xl font-bold text-nowrap">Other Articles</h3>
                        <div className="h-[1px] ml-2 w-full bg-black md:hidden">
                        </div>
                        </div>
                        {articles?.map((article, index) => (
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
            </div>
        </div>

    )
}