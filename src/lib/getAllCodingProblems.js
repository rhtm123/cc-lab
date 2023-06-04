export async function getAllCodingProblems() {
  let API_URL = import.meta.env.VITE_API_URL;

    let url = API_URL + "editor/codingproblems/?is_published=true&level=&ordering=updated"

    let problems = [];
    while (true){
    //   console.log(url);
      const res3 = await fetch(url);
      const data = await res3.json();
      problems.push(...data.results);
    //   console.log(data.next);
      if (data.next) {url=data.next} else {break}
    }
  
    return problems
  }