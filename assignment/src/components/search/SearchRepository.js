import React, {useState} from 'react';
import {fetchRepository} from '../../api/api.js';
import { TextField } from "@mui/material";
import SearchRepositoriesList from './SearchRepositoriesList.js';

function SearchRepository(){
    const [repositories,setRepositories] = useState([]);
    const [pager, setPager]=useState({
        count:0,
        page:0,
        rowsPerPage:10
    });
    const [keyword,setKeyword]=useState('');
    const inputTextId = 'search__repositories';
    
    /* 디바운싱 적용 */    
    let onInputTimeout;
    const searchRepository = async (value,page=0,rowsPerPage=10)=>{
        if(!value){
            setRepositories([]);
            setPager({
                count:0,
                page:0,
                rowsPerPage
            });
        }
        setKeyword(value);
        const {items,total_count} = await fetchRepository(value,page+1,rowsPerPage);
        setRepositories(items.map(({id,owner,full_name,html_url,name})=>{
            return {id,'login':owner.login,full_name,html_url,name}
        }));
        setPager({
            count:total_count,
            page,
            rowsPerPage
        });
    };
    const onKeywordInput = ({target})=>{
        clearTimeout(onInputTimeout);
        onInputTimeout=setTimeout( ()=>{
            const {value} = target;
            searchRepository(value,0,pager.rowsPerPage)
            
        },800)
    }
    const onClickPage = async (currentPage,rowsPerPage)=>{
        searchRepository(keyword,currentPage,rowsPerPage);
    }
    return (
        <>
            <TextField
                id={inputTextId}
                label="저장소 검색"
                type="search"
                variant="standard"
                onInput={onKeywordInput}
                placeholder='저장소를 입력해주세요.'
            />
            <SearchRepositoriesList 
                repositories={repositories}
                pager={pager}
                onClickPage={onClickPage}
            />
        </>
    )
}

export default SearchRepository;
