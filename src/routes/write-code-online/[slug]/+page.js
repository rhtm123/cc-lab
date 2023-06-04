import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params,fetch }) {
  let slug = params.slug;
  let API_URL = import.meta.env.VITE_API_URL;

  let url = API_URL+`editor/project/${slug}/`;
  let res = await fetch(url);
  return res.json();
}