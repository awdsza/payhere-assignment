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
const selectIssues = async (owner,repo,page=1,per_page=10)=>{
    const END_POINT = `/repos/${owner}/${repo}/issues?per_page=${per_page}&page=${page}`;
    try{
        return REQUEST(`${END_POINT}`);
    }catch(e){
        console.error(e);
    }
}
const selectIssueCount = async (owner,repo)=>{
    const full_name = `${encodeURIComponent(owner / repo)}`
    
    const END_POINT = `search/issues?q=repo:${full_name}+type:issue`;

    return await REQUEST(`${END_POINT}`);
}
export {searchRepository,selectIssues,selectIssueCount};
