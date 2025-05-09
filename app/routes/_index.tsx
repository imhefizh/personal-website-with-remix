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
      <div className="text-white">
        <About />
        <BadgesAndCerts datas={badgesAndCerts} />
        <Articles datas={articles} />
        <Works />
        <p className="text-xs mt-5">
          Here is the end. Thank you for visiting my personal website, wish you were enjoy it!
        </p>
        <p className="text-xs mt-3">
          This website is made by me with <strong>Remix</strong> and <strong>Tailwind CSS</strong>, deployed on <strong>Cloudflare</strong>.</p>
      </div>
  );
} 
