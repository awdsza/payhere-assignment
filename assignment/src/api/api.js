const BASE_URL = 'https://api.github.com';

const REQUEST = async (END_POINT,options)=>{
    const response = await fetch(`${BASE_URL}/${END_POINT}`,options);
    if( ( !response.ok ) || response.status >= 400 ){
        throw new Error('API 서버에 문제가 생겼습니다');
    }
    return await response.json();
}

const searchRepository = (keyword)=>{
    try{
        return REQUEST(`search/repositories?q=${encodeURIComponent(keyword)}`);
    }catch(e){
        console.error(e);
    }
}
const selectIssues = (owner,repo,{per_page=10,page=1})=>{
    const END_POINT = `/repos/${owner}/${repo}/issues?per_page=${per_page}&page=${page}`;
    try{
        return REQUEST(`${END_POINT}`);
    }catch(e){
        console.error(e);
    }
}

export {searchRepository,selectIssues};
