import React from 'react';

function Pager({pager,pageClick,pageSize=10}){
    const {total_count:totalCount,currentPage} = pager;
    const totalPage = Math.ceil(totalCount/pageSize);
    const startPage = ( Math.ceil( currentPage / pageSize ) -1 )  * pageSize + 1;
    const lastPage =  ( Math.ceil( currentPage / pageSize ) -1 )  * pageSize + pageSize;

    const pageArr=[];
    for(let i = startPage; i<=(lastPage > totalPage ? totalPage : lastPage) ; i++){
        pageArr.push(i);
    }

    return(
        <>
            {pageArr.length === 0  ? '' :
            <ul>
                
                <li onClick={()=>pageClick(1)}> first </li>
                {
                    pageArr.map(page=> 
                    <li key={page}>
                        <a  onClick={ ()=>pageClick(page) } >{page}</a>    
                    </li>)
                }
                { lastPage+1 < totalPage ? <li onClick={()=>pageClick(lastPage+1)}> next </li> : null }
                
            </ul>
            }
        </>
    )
}

export default Pager;