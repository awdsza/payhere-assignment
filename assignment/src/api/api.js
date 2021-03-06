import { ERROR_FETCH } from "../utils/keywords";
const BASE_URL = 'https://api.github.com';

const REQUEST = async (END_POINT,options)=>{
    
    const response = await fetch(`${BASE_URL}/${END_POINT}`,options);
    if( ( !response.ok ) || response.status >= 400 ){
        throw new Error(ERROR_FETCH);
    }
    return await response.json();
}

const fetchRepository = async (keyword,page=1,per_page=10)=>{
    try{
        return REQUEST(`search/repositories?q=${encodeURIComponent(keyword)}&page=${page}&per_page=${per_page}`);
    }catch(e){
        console.error(e);
    }
}
const fetchIssues = async (owner,repo,page=1,per_page=10)=>{
    try{
        const full_name = encodeURIComponent(`${owner}/${repo}`);
        return REQUEST(`search/issues?q=repo:${full_name}+type:issue&per_page=${per_page}&page=${page}`);
    }catch(e){
        console.error(e);
    }
}

export {fetchRepository,fetchIssues};
