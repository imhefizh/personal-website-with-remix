export default function Works({pageData}) {
    return (
        <div className={`mt-8 md:w-[55%] md:mt-0 md:py-28 ${pageData == 3 ? "" : "hidden"}`}>
            <h1 className="font-bold text-2xl md:text-3xl">Works</h1>
            <div className="flex flex-col">
                <p className="text-xs mt-2 md:text-base">
                    And here is my works, you can check it one by one..
                </p>
                <a href="https://recraftstudio.agency" target="_blank" rel="noreferrer" id="work-card" className={`mt-3 border border-white w-full h-auto rounded-md p-3`}>
                    <img src="/recraft-preview.png" alt="thumbnail" width={500} height={300} className="bg-white rounded-md h-auto w-full"/>
                    <h2 className="font-semibold text-lg leading-tight mt-2 md:text-xl">Recraft Studio Agency</h2>
                    <p className="text-xs mt-1 line-clamp-2 md:text-base">SPA Website for Recraft Studio&apos;s customer ordering the services</p>
                    <ul className="mt-3 flex gap-1 flex-wrap text-xs">
                            <li className="w-fit bg-white text-black rounded-full px-2">React</li>
                            <li className="w-fit bg-white text-black rounded-full px-2">MongoDB</li>
                            <li className="w-fit bg-white text-black rounded-full px-2">Payment Gateway</li>
                            <li className="w-fit bg-white text-black rounded-full px-2">JWT</li>
                            <li className="w-fit bg-white text-black rounded-full px-2">Whatsapp API</li>
                    </ul>
                </a>
                <div id="article-card" className={`mt-3 border border-white w-full h-auto rounded-md p-3`}>
                    <img src="" alt="thumbnail" width={500} height={250} className="bg-white rounded-md h-auto w-full" />
                    <h2 className="font-semibold text-lg leading-tight mt-2 md:text-xl">Personal Website</h2>
                    <p className="text-xs mt-1 line-clamp-2 md:text-base">Website for personal branding while I share some articles or things. </p>
                    <ul className="mt-3 flex gap-1 flex-wrap text-xs">
                            <li className="w-fit bg-white text-black rounded-full px-2">Remix</li>
                            <li className="w-fit bg-white text-black rounded-full px-2">MongoDB</li>
                            <li className="w-fit bg-white text-black rounded-full px-2">JWT</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}