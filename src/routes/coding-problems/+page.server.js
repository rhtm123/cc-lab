import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
let API_URL = import.meta.env.VITE_API_URL;

export const prerender = true; // SSR


export async function load() {
let url = API_URL+"editor/codingproblems/?is_published=true&level=&ordering=created";
   let res = await fetch(url);
   return res.json();
}