import React, {useState} from 'react';
import {searchRepository} from '../../api/api.js';
import SearchRepositoriesList from './SearchRepositoriesList.js';

function SearchRepository(){
    const [repositories,setRepositories] = useState([]);
    const [pager, setPager]=useState({});
    const [keyword,setKeyword]=useState('');
    const inputTextId = 'search__repositories';
    
    /* 디바운싱 적용 */    
    let onInputTimeout;
    const onKeywordInput = ({target})=>{
        clearTimeout(onInputTimeout);
        onInputTimeout=setTimeout( async ()=>{

            const {value} = target;
            setKeyword(value);
            const {items,total_count} = await searchRepository(value);
            setRepositories(items);
            setPager({
                total_count,
                currentPage:1
            });
        },500)
    }
    const onClickPage = async currentPage=>{
        const {items,total_count} = await searchRepository(keyword,currentPage);
        setRepositories(items);
        setPager({
            total_count,
            currentPage
        });

    }
    return (
        <>
            <label htmlFor={inputTextId}>저장소 검색 : </label> 
            <input type='text' id={inputTextId} onInput={onKeywordInput} placeholder='저장소를 입력해주세요.'/>
            <SearchRepositoriesList 
                repositories={repositories}
                pager={pager}
                onClickPage={onClickPage}
            />
        </>
    )
}

export default SearchRepository;