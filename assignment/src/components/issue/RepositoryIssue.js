import React,{useState,useEffect} from 'react';
import {getSelectedRepo,deleteSelectedRepo} from '../../storage/storage';

import IssueList from './IssueList';

function RepositoryIssue(){
    const [selectRepoList,setSelectRepoList]=useState([]);
    const [repoInfo,setRepoInfo] = useState({
        owner:'',
        repo:''
    });
    useEffect(()=>{
        const _selectRepoList = getSelectedRepo(); 
        const [owner,repo] =  (_selectRepoList.length === 0 ? '/':_selectRepoList[0]['full_name'] ).split('/');
        setSelectRepoList(_selectRepoList);
        setRepoInfo({
            owner,repo
        })
        return ()=> {
            console.log('완료');
        }
    },[]);

    const {owner,repo} = repoInfo;

    const selectedRepoClick = full_name=>{
        const [owner,repo] = full_name.split('/');
        console.log(`owner=${owner}, repo=${repo}`);
    }
    const selectedRepoDelete = id=>{
        deleteSelectedRepo(id);
        setSelectRepoList(getSelectedRepo());
    }
    return (
        <>
        {
            selectRepoList.length === 0 ? <p>등록된 Repository가 없습니다.</p> :
            <ul>
                {
                    selectRepoList.map( 
                        ( {id,name:repo_name,full_name} ) =>  ( <li key={id} onClick={()=>selectedRepoClick(full_name)}>
                            {repo_name}
                            <button onClick={()=>selectedRepoDelete(id)}>삭제</button></li> )
                    )
                }
            </ul>

        }
        <IssueList
        owner={owner}
        repo={repo}
        />
        </>
    )
}

export default RepositoryIssue;
