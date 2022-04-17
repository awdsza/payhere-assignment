import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


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
        }
    },[]);

    const {owner,repo} = repoInfo;

    const selectedRepoClick = full_name=>{
        const [owner,repo] = full_name.split('/');
        setRepoInfo({
            owner,
            repo
        })
    }
    const selectedRepoDelete = id=>{
        deleteSelectedRepo(id);
        setSelectRepoList(getSelectedRepo());
    }
    
    return (
        <>
        {
            selectRepoList.length === 0 ? <p>등록된 Repository가 없습니다.</p> :
            <Box sx={{ width: '100%' }}>
                <Stack  direction='row' spacing={2}>
                {
                    selectRepoList.map( 
                        ( {id,name:repo_name,full_name} ) =>  ( 
                            <Chip key={id} 
                            label={repo_name} 
                            onClick={()=>selectedRepoClick(full_name)}
                            onDelete={()=>selectedRepoDelete(id)}
                            /> )
                    )
                }
                </Stack>
            </Box>

        }
        <IssueList
        owner={owner}
        repo={repo}
        />
        </>
    )
}

export default RepositoryIssue;
