import React from "react";
import TableComp from '../common/TableComp';
import {setSelectedRepo,countSelectedRepo,getSelectedRepo} from '../../storage/storage.js';
import {ADD_REPOSITORY_LIMIT} from '../../utils/constants.js';
import {ADD_REPOSITORY_LIMIT_WARN,ALERT_DUPLICATE_ADD_REPO,ALERT_ADD_REPO} from '../../utils/keywords.js';

function SearchRepositoriesList({repositories,pager,onClickPage}){
    
    
    const addRepo=repo=>{
            if(countSelectedRepo() === ADD_REPOSITORY_LIMIT){
                alert(ADD_REPOSITORY_LIMIT_WARN);
                return;
            }

            const selectedRepo = getSelectedRepo();
            if(selectedRepo.some( _repo => _repo.id === repo.id )){
                alert(ALERT_DUPLICATE_ADD_REPO);
                return;
            }
            selectedRepo.push(repo);
    
            setSelectedRepo(selectedRepo);
            alert(ALERT_ADD_REPO);
    }
    const header = [
        {
          title:'유저명',
          paramName:'login'
        },{
            title:'저장소명',
            paramName:'name'
        }
        ,{
          title:'github 경로',
          paramName:'html_url'
        }
        ,{
          title:'저장소 추가',
          type:'button',
          props:{
                text:'추가',
                onClick:(item)=>addRepo(item)
          }
        }
      ];
    return (
        <>
        <TableComp
                header={header}
                list={repositories}
                pager={pager}
                pageClick={onClickPage}
                />
        </>
    )
}


export default SearchRepositoriesList;
