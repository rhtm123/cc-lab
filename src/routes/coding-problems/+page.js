import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({  fetch, setHeaders }) {
let url = "https://codingchaska.up.railway.app/api/v1/editor/codingproblems/?is_published=true&level=&ordering=updated";
   let res = await fetch(url);
   return res.json();
   throw error(404, 'Not found');
}