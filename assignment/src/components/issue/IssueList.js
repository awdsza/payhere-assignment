import React, {useState,useEffect} from "react";
import {selectIssues} from '../../api/api.js';

import Pager from '../common/Pager';
function IssueList({owner,repo}){
    const [issues,setIssues]=useState([]);
    const [pager,setPager]=useState({});
    const [searchParam,setSearchParam]=useState({});
    
    

    useEffect( () => {
        async function fetchData(){
            
            const {items,total_count} = await selectIssues(owner,repo,1);
            setIssues(items);
            setPager({
                total_count,
                currentPage:1
            });

        }
        if(owner && repo){
            setSearchParam({owner,repo});
            fetchData();
        }
        return ()=>{
        }
    }, [owner,repo] )
    const onClickPage = async currentPage=>{
        const {owner,repo} = searchParam;
        const {items,total_count} = await selectIssues(owner,repo,currentPage);
        setIssues(items);
        setPager({
            total_count,
            currentPage:currentPage
        });
    }
    return (
        <section>
        {
            issues.length === 0 ? <p>해당 RepositoryIssue가 없습니다</p>
            : <ul>
            { 
                issues.map( (issue) => 
                <li key={issue.id}>
                    [{repo}]
                    <dl>
                        <dt>
                            <a href={issue.html_url} target='_blank'>{issue.title}</a>
                        </dt>
                        <dd>
                            {/* #430 opened on 13 Mar by zhoufanglu */}
                            {/* #426 by ugurcanalyuz was closed on 11 Feb */}
                            
                            {issue.user.login} was {issue.state}ed by {issue.updated_at}
                            댓글 : {issue.comments}
                        </dd>
                    </dl>
                </li>) 
            }
            </ul>
        }
        <Pager
        pager={pager}
        pageClick={(page)=>onClickPage(page)}
        />    
        </section>
        
    )
}

export default IssueList;
