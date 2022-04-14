import React from 'react';

function Pager({pager,pageClick,currentPage=1,pageSize=10}){
    const {total_count:totalCount} = pager;
    const maxPage = Math.ceil(396/10);
    const startPage = ( Math.floor( currentPage / pageSize ) * pageSize ) + 1;
    const lastPage =  ( ( currentPage / pageSize ) * pageSize) + pageSize;
    const pegerInfo = {
        totalCount,
        maxPage,
        startPage,
        lastPage,
        currentPage,
        pageSize
    }
    return(
        <ul>
            <li>
                여기는 페이져 공통 컴포넌트임니다.
            </li>
        </ul>
    )
}

export default Pager;