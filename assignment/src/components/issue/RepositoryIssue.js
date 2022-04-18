import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import React,{useState,useEffect} from 'react';
import {getSelectedRepo,deleteSelectedRepo} from '../../storage/storage';
import {PRINT_NOT_ADD_REPO} from '../../utils/keywords';


import IssueList from './IssueList';

function RepositoryIssue(){
    const [selectRepoList,setSelectRepoList]=useState([]);
    const [repoInfo,setRepoInfo] = useState({
        owner:'',
        repo:'',
        selectedIndex:0
    });

    useEffect(()=>{
        const _selectRepoList = getSelectedRepo(); 
        const [owner,repo] =  (_selectRepoList.length === 0 ? '/':_selectRepoList[0]['full_name'] ).split('/');
        setSelectRepoList(_selectRepoList);
        setRepoInfo({
            owner,repo,selectedIndex:0
        })
        return ()=> {
        }
    },[]);

    const {owner,repo} = repoInfo;

    const selectedRepoClick = (full_name,selectedIndex)=>{
        const [owner,repo] = full_name.split('/');
        const _selectRepoList = getSelectedRepo(); 
        setSelectRepoList(_selectRepoList);
        setRepoInfo({
            owner,repo,selectedIndex
        })
    }
    const selectedRepoDelete = id=>{
        deleteSelectedRepo(id);
        const _selectRepoList = getSelectedRepo(); 
        const [owner,repo] =  (_selectRepoList.length === 0 ? '/':_selectRepoList[0]['full_name'] ).split('/');
        setSelectRepoList(_selectRepoList);
        setRepoInfo({
            owner,repo,selectedIndex:0
        })
    }
    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(0.5),
      }));

    const NoDataTag = styled('p')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    }));

    return (
        <>
        {
            selectRepoList.length === 0 ? 
            <NoDataTag>{PRINT_NOT_ADD_REPO}</NoDataTag>
            :
            <Paper
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                m: 0,
            }}
            component="ul"
            >
            {selectRepoList.map(({id,name:repo_name,full_name},idx) => {
                return (
                <ListItem key={id}>
                    <Chip
                    label={repo_name}
                    onClick={()=>selectedRepoClick(full_name,idx)}
                    onDelete={()=>selectedRepoDelete(id)}
                    color={idx===repoInfo.selectedIndex ? 'primary':'default'}
                    />
                </ListItem>
                );
            })}
            </Paper>

        }
        <IssueList
        owner={owner}
        repo={repo}
        />
        </>
    )
}

export default RepositoryIssue;
