import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params,fetch }) {
  let slug = params.slug;
  let url = `https://codingchaska.up.railway.app/api/v1/editor/codingproblem/${slug}/`;
  let res = await fetch(url);
  const error1 = res.ok ? false : true
  // @ts-ignore
  if (error1) {
    throw error(404, {
      message: 'Not found'
    });
  }

  return res.json()
 }