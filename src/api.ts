export function fetchNews(category:string | undefined){
    return fetch(`https://inshortsapi.vercel.app/news?category=${category}`)
    .then(response=>response.json());
 }