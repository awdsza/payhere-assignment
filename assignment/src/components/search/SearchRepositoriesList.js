import React from "react";
import {setSelectedRepo,countSelectedRepo} from '../../storage/storage.js';
import {ADD_REPOSITORY_LIMIT} from '../../utils/constants.js';
import {ADD_REPOSITORY_LIMIT_WARN} from '../../utils/keywords.js';

import Pager from '../common/Pager';

function SearchRepositoriesList({repositories,pager,onClickPage}){
    
    
    const addRepoClick=(repo)=>{
            if(countSelectedRepo() === ADD_REPOSITORY_LIMIT){
                alert(ADD_REPOSITORY_LIMIT_WARN);
                return;
            }
            setSelectedRepo(repo);
        
    }

    return (
        <section>
        {repositories.length === 0 
        ? <span>검색된 결과가 없습니다</span>
        :
        <ul>
            {
                repositories.map( ({name,full_name,id,node_id,owner,html_url }) => 
                <li data-id={id} data-node-id={node_id}  key={id}>{name} | {full_name}<button onClick={()=>addRepoClick({id,name,full_name})}>추가</button></li> 
                )
            }
        </ul>
        }
        <Pager
            pager={pager}
            pageClick={onClickPage}
        />
        </section>
    )
}


export default SearchRepositoriesList;