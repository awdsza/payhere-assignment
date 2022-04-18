import React, {useState,useEffect} from "react";
import {fetchIssues} from '../../api/api.js';

import TableComp from '../common/TableComp';

import IssueSample from '../../jsons/IssueSample.json';

function IssueList({owner,repo}){
    const [issues,setIssues]=useState([]);
    const [pager,setPager]=useState({ count:0, page:0, rowsPerPage:10});
    const [searchParam,setSearchParam]=useState({owner,repo});
    
    
    const searchIssues = async (owner,repo,page=0,rowsPerPage=10)=>{
        
        if(owner && repo){
            const {items,total_count} = await fetchIssues(owner,repo,page+1,rowsPerPage);
            // const {items,total_count} = IssueSample;
            setIssues(items.map((item)=>{return {
                    ...item,
                    login:item.user.login,
                    repo:repo
                };
            }));
            setPager({
                page,
                rowsPerPage,
                count:total_count
            });
            setSearchParam({owner,repo});
        }
    };

    useEffect( () => {
        setPager({
            page:0,
            rowsPerPage:10
        });
        searchIssues(owner,repo,0,10);
        return ()=>{
        }
    }, [owner,repo] );
    
    const onClickPage = async (currentPage,rowsPerPage)=>{
        const {owner,repo} = searchParam;
        searchIssues(owner,repo,currentPage,rowsPerPage)
    }

    const header = [
    {
        title:'Issue 번호',
        paramName:'number'
    },{
        title:'Repository명',
        paramName:'repo'
    },{
        title:'제목',
        paramName:'title'
    },{
        title:'작성자',
        paramName:'login'
    },{
        title:'작성일자',
        paramName:'updated_at'
    },{
        title:'Issue상세',
        paramName:'html_url',
        type:'link',
        props:{
            text:'클릭'
        }
    },{
        title:'작성 댓글수',
        paramName:'comments'
    }];
    return (
        <TableComp
            header={header}
            list={issues}
            pager={pager}
            pageClick={onClickPage}
        />
    )
}

export default IssueList;
