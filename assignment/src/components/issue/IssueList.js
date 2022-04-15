import React, {useState,useEffect} from "react";
import {selectIssues,selectIssueCount} from '../../api/api.js';

import Pager from '../common/Pager';
function IssueList({owner,repo}){
    const [issues,setIssues]=useState([]);
    const [pager,setPager]=useState({});
    useEffect( () => {
        async function fetchData(){
            
            setIssues(await selectIssues(owner,repo,1));
            setPager(await selectIssueCount(owner,repo));
        }
        if(owner && repo){
            fetchData();
        }
        return ()=>{
        }
    }, [owner,repo] )
    
    return (
        <section>
        {
            issues.length === 0 ? <p>해당 RepositoryIssue가 없습니다</p>
            : <ul>
            { 
                issues.map( (issue) => 
                <li>
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
        pageClick={(page)=>console.log(page)}
        />    
        </section>
        
    )
}

export default IssueList;
