const BASE_URL = 'https://api.github.com';

const REQUEST = async (END_POINT,options)=>{
    const response = await fetch(`${BASE_URL}/${END_POINT}`,options);
    if( ( !response.ok ) || response.status >= 400 ){
        throw new Error('API 서버에 문제가 생겼습니다');
    }
    return await response.json();
}

const searchRepository = async (keyword,page=1,per_page=10)=>{
    try{
        return REQUEST(`search/repositories?q=${encodeURIComponent(keyword)}&page=${page}&per_page=${per_page}`);
    }catch(e){
        console.error(e);
    }
}
const selectIssues = async (owner,repo,page=1,per_page=10)=>{
    try{
        const full_name = encodeURIComponent(`${owner}/${repo}`);
        return REQUEST(`search/issues?q=repo:${full_name}+type:issue&per_page=${per_page}&page=${page}`);
    }catch(e){
        console.error(e);
    }
}

export {searchRepository,selectIssues};
