import type { MetaFunction } from "@remix-run/node";
import About from "~/components/about";
import BadgesAndCerts from "~/components/badgesAndCerts";
import { useLoaderData } from "@remix-run/react";
import { readAchievement, readArticles } from "../../db.js"
import Articles from "~/components/articles.js";
import Works from "~/components/works.js";

export async function loader() {
    try {
        const badgesAndCerts = await readAchievement();
        const articles = await readArticles();

        const badges = []
        const certs = []
        for (const x in badgesAndCerts) {
            if (badgesAndCerts[x].type == "Badges") {
                badges.push(badgesAndCerts[x])
            } else {
                certs.push(badgesAndCerts[x])
            }
        }

        const data = {
          badgesAndCerts: [badges, certs],
          articles: articles,
        }
        // console.log(data)
        return data
    } catch (e) {
        console.log(e)
        return
    }
}

export const meta: MetaFunction = () => {
  return [
    { title: "Maulana Hafidz Ismail" },
    { name: "description", content: "It is my personal website. Here I put my works so you can be satisfied." },
  ];
};

export default function Index() {
  const {badgesAndCerts} = useLoaderData<typeof loader>();
  const {articles} = useLoaderData<typeof loader>();

  return (
      <div className="text-white bg-black px-7 pb-6">
        <header className="mt-12">
        <h1 className="font-[800] text-5xl">Maulana Hafidz Ismail</h1>
        <div id="roles" className="flex flex-wrap gap-1 mt-3">
          <div className="text-black bg-white rounded-full w-fit px-2 text-sm">Fullstack Developer</div>
          <div className="text-black bg-white rounded-full w-fit px-2 text-sm">Software Engineer</div>
        </div>
        <p className="mt-3 text-xs">This website will serve as a gallery of my works and skills, where I&apos;ll showcase everything I create.</p>
        <div className="flex mt-8 gap-3 items-center">
          <a href="mailto:hafidzsml@gmail.com" target="_blank" rel="noreferrer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="800"
              height="800"
              viewBox="0 0 1920 1920"
              className="h-auto w-5 fill-white"
              >
              <path
                  fillRule="evenodd"
                  d="M1920 428.266v1189.54l-464.16-580.146-88.203 70.585 468.679 585.904H83.684l468.679-585.904-88.202-70.585L0 1617.805V428.265l959.944 832.441zM1919.932 226v52.627l-959.943 832.44L.045 278.628V226z"
                  ></path>
            </svg>
          </a>
          <a href="tel:+6285789289896" target="_blank" rel="noreferrer">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="800"
                height="800"
                viewBox="0 0 16 16"
                className="h-auto w-5 fill-white"
            >
                <path d="M11.42 9.49c-.19-.09-1.1-.54-1.27-.61s-.29-.09-.42.1-.48.6-.59.73-.21.14-.4 0a5.1 5.1 0 0 1-1.49-.92 5.3 5.3 0 0 1-1-1.29c-.11-.18 0-.28.08-.38s.18-.21.28-.32a1.4 1.4 0 0 0 .18-.31.38.38 0 0 0 0-.33c0-.09-.42-1-.58-1.37s-.3-.32-.41-.32h-.4a.72.72 0 0 0-.5.23 2.1 2.1 0 0 0-.65 1.55A3.6 3.6 0 0 0 5 8.2 8.3 8.3 0 0 0 8.19 11c.44.19.78.3 1.05.39a2.5 2.5 0 0 0 1.17.07 1.93 1.93 0 0 0 1.26-.88 1.67 1.67 0 0 0 .11-.88c-.05-.07-.17-.12-.36-.21"></path>
                <path d="M13.29 2.68A7.36 7.36 0 0 0 8 .5a7.44 7.44 0 0 0-6.41 11.15l-1 3.85 3.94-1a7.4 7.4 0 0 0 3.55.9H8a7.44 7.44 0 0 0 5.29-12.72M8 14.12a6.1 6.1 0 0 1-3.15-.87l-.22-.13-2.34.61.62-2.28-.14-.23a6.18 6.18 0 0 1 9.6-7.65 6.12 6.12 0 0 1 1.81 4.37A6.19 6.19 0 0 1 8 14.12"></path>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/maulana-hafidz-ismail/" target="_blank" rel="noreferrer">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="72"
              height="72"
              viewBox="0 0 72 72"
              className="h-auto w-[19px] -ml-[1px]"
          >
              <g fill="none" fillRule="evenodd">
                  <path
                      fill="#FFF"
                      d="M8 72h56a8 8 0 0 0 8-8V8a8 8 0 0 0-8-8H8a8 8 0 0 0-8 8v56a8 8 0 0 0 8 8"
                  ></path>
                  <path
                      fill="#000"
                      d="M62 62H51.316V43.802c0-4.99-1.896-7.777-5.845-7.777-4.296 0-6.54 2.901-6.54 7.777V62H28.632V27.333H38.93v4.67s3.096-5.729 10.453-5.729c7.353 0 12.617 4.49 12.617 13.777zM16.35 22.794c-3.508 0-6.35-2.864-6.35-6.397S12.842 10 16.35 10s6.347 2.864 6.347 6.397-2.84 6.397-6.348 6.397M11.032 62h10.736V27.333H11.033z"
                  ></path>
              </g>
          </svg>
          </a>
          <a href="https://github.com/imhefizh/" target="_blank" rel="noreferrer">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              className="fill-white h-auto w-[25px] -mx-[1px]"
          >
              <path d="M15 3C8.373 3 3 8.373 3 15c0 5.623 3.872 10.328 9.092 11.63a1.8 1.8 0 0 1-.092-.583v-2.051h-1.508c-.821 0-1.551-.353-1.905-1.009-.393-.729-.461-1.844-1.435-2.526-.289-.227-.069-.486.264-.451.615.174 1.125.596 1.605 1.222.478.627.703.769 1.596.769.433 0 1.081-.025 1.691-.121.328-.833.895-1.6 1.588-1.962-3.996-.411-5.903-2.399-5.903-5.098 0-1.162.495-2.286 1.336-3.233-.276-.94-.623-2.857.106-3.587 1.798 0 2.885 1.166 3.146 1.481A9 9 0 0 1 15.495 9c1.036 0 2.024.174 2.922.483C18.675 9.17 19.763 8 21.565 8c.732.731.381 2.656.102 3.594.836.945 1.328 2.066 1.328 3.226 0 2.697-1.904 4.684-5.894 5.097C18.199 20.49 19 22.1 19 23.313v2.734c0 .104-.023.179-.035.268C23.641 24.676 27 20.236 27 15c0-6.627-5.373-12-12-12"></path>
          </svg>
          </a>
          <a href="https://www.credly.com/users/maulana-hafidz-ismail" target="_blank" rel="noreferrer">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              className="h-auto w-6 -mx-1"
          >
              <path
                  fill="#fff"
                  d="M42 37c0 2.76-2.24 5-5 5H11c-2.76 0-5-2.24-5-5V11c0-2.76 2.24-5 5-5h26c2.76 0 5 2.24 5 5z"
              ></path>
              <path
                  fill="#000"
                  d="M33.77 27.04c-.71-.5-1.68-.32-2.18.39-2.14 2.96-5.22 5.57-9.58 5.57s-4.62-7.88-2-13c1.61-3.14 3.87-5.73 5.84-5.72 1.39 0 2.18 1.26 1.8 2.6-.46 1.63-.51 2.72-.51 2.81-.04.96.71 1.77 1.68 1.8.02 0 .04.01.07.01.93 0 1.7-.74 1.74-1.68 0-.03.18-3.31 2.78-6.77.63-.84.39-2.07-.57-2.59-.77-.42-1.75-.14-2.27.56-.15.2-.29.39-.42.59-.14.2-.4.27-.62.17-7.7-3.47-12.07 3.86-13.51 7.23-3 7-3 18 5.62 18 7.22 0 10.63-4.75 12.6-7.79.46-.71.27-1.66-.42-2.14-.01 0-.02-.02-.03-.02Z"
              ></path>
          </svg>
          </a>
        </div>
      </header>
        <About />
        <BadgesAndCerts datas={badgesAndCerts} />
        <Articles datas={articles} />
        <Works />
        <p className="text-xs mt-5">
          Here is the end. Thank you for visiting my personal website, wish you were enjoy it!
        </p>
        <p className="text-xs mt-3 mb-8">
          This website is made by Maulana Hafidz Ismail with <strong>Remix</strong> and <strong>Tailwind CSS</strong>, and deployed with <strong>Amazon Lightsail</strong>.</p>
      </div>
  );
} 
