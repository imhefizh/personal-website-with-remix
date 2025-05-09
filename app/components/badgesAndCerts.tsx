import { useState } from "react"

interface Props {
    datas: {
        name: string;
        img: string;
        issuer: string;
        provided_by: string;
        url: string;
        shape: string;
    }[][]
}
export default function BadgesAndCerts({datas}:Props) {
const [whichOne, setWhichOne] = useState(0)
const [show, setShow] = useState(false);
const data = datas

    return (
        <div className="mt-8">
            <h1 className="font-bold text-2xl">Badges and Certificates</h1>
            <div className="flex flex-col items-center">
                <p className="text-xs mt-2">I like to do my own learning. Often by taking online courses and professional certifications. Here are the badges and certificates I have earned so far...</p>
                <ul className="flex gap-5 mt-3">
                    <li className={`${whichOne == 0 ? "border-b-2 border-white border-spacing-5" : ""} cursor-pointer`}>
                        <button onClick={() => setWhichOne(0)}>Badges</button>
                    </li>
                    <li className={`${whichOne == 1 ? "border-b-2 border-white border-spacing-5" : ""} cursor-pointer`}>
                        <button  onClick={() => setWhichOne(1)}>
                        Certificates
                        </button>
                    </li>
                </ul>
                <div className={`gap-4 mt-4 grid w-auto grid-cols-3`}>
                    {data[0].map((data, index) => (
                        <a key={index} id="badge-card" href={data.url} target="_blank" rel="noreferrer" className={`${index <= 5 || show == true ? "":"hidden"} hover:-translate-y-1 hover:drop-shadow-[0px_7px_10px_rgba(255,255,255,0.2)] bg-black transition-all ease-out duration-200 delay-[150] w-fit flex flex-col items-center cursor-pointer ${whichOne == 0 ? "" : "hidden"} `}>
                            <div className="border border-white rounded-t-md w-fit flex flex-col items-center p-2">
                                <img className={`${data.shape == "Circle" ? "rounded-full" : ""}`} src={data.img} height={100} width={100} alt={data.name} />
                                <p className="truncate w-20 pt-2 text-xs tablet:text-base">{data.name}</p>
                                <p className="italic font-light pt-1 text-[9px] text-nowrap tablet:text-xs">Issuer: {data.issuer}</p>
                            </div>
                            <div className="w-full bg-white h-5 rounded-b-md text-gray-400 text-[9px] text-nowrap flex items-center justify-center">Provided By {data.provided_by}</div>
                        </a>
                    ))}
                    {data[1].map((data, index) => (
                        <a key={index} id="badge-card" href={data.url} target="_blank" rel="noreferrer" className={`${index <= 5 || show == true ? "": "hidden"} hover:-translate-y-1 hover:drop-shadow-[0px_7px_10px_rgba(255,255,255,0.2)] bg-black transition-all ease-out duration-200 delay-[150] w-fit flex flex-col items-center cursor-pointer ${whichOne == 1 ? "" : "hidden"} `}>
                            <div className="border border-white rounded-t-md w-fit flex flex-col items-center p-2">
                                <img className={`${data.shape == "Circle" ? "rounded-full" : ""}`} src={data.img} height={100} width={100} alt={data.name} />
                                <p className="truncate w-20 pt-2 text-xs tablet:text-base">{data.name}</p>
                                <p className="italic font-light pt-1 text-[9px] text-nowrap tablet:text-xs">Issuer: {data.issuer}</p>
                            </div>
                            <div className="w-full bg-white h-5 rounded-b-md text-gray-400 text-[9px] text-nowrap flex items-center justify-center">Provided By {data.provided_by}</div>
                        </a>
                    ))}
                </div>
                <button className="pt-5 tablet:hidden flex items-center gap-1 w-full justify-center" onClick={() => setShow((prev) => !prev)}>
                    <div className="bg-white w-5 h-[2px]"></div>
                    <p className="text-xs">{show == false ? "Show more" : "Show less"}</p>
                    <div className="bg-white w-5 h-[2px]"></div>
                </button>
            </div>
        </div>
    )
}