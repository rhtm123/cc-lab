

import { getAllCodingProblems } from '../../lib/getAllCodingProblems';



const pages = ["coding-problems","about","online-editor"] //list of pages as a string ex. ["about", "blog", "contact"]
const site = "https://www.codingchaskalab.com"

const website = "https://www.codingchaskalab.com"

/** @type {import('./$types').RequestHandler} */
export async function GET({
    url
}) {
    const codingproblems = await getAllCodingProblems();
    const body = sitemap(codingproblems, pages);
    const response = new Response(body);
    response.headers.set('Cache-Control', 'max-age=0, s-maxage=3600');
    response.headers.set('Content-Type', 'application/xml');
    return response;
}


const sitemap = (codingproblems, pages) => `<?xml version="1.0" encoding="UTF-8" ?>
<urlset
  xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
  xmlns:xhtml="https://www.w3.org/1999/xhtml"
  xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
  xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
  xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
>
  <url>
    <loc>${site}</loc>
  </url>
  ${pages.map((page) => `
  <url>
    <loc>${website}/${page}</loc>
  </url>
  `).join('')}
  ${codingproblems.map((codingproblem) => `
  <url>
    <loc>${website}/coding-problem/${codingproblem.slug}</loc>
    <lastmod>${codingproblem.updated}</lastmod>
  </url>
  `
		)
		.join('')}
</urlset>`;