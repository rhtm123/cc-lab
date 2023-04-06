import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params,fetch }) {
  let slug = params.slug;
  let url = `https://codingchaska.up.railway.app/api/v1/editor/project/${slug}/`;
  let res = await fetch(url);
  return res.json();
}