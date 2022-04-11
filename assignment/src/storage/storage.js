const getSelectedRepo = (key) =>{
    try{
        return JSON.parse(localStorage.getItem(key) || '[]');
    }catch(e){
        console.error(e);
        alert(e);
    }
}

const setSelectedRepo= (key,item) => {
    localStorage.setItem(key,JSON.stringify(item));
};


const deleteSelectedRepo = (key,id)=>{
    try{
        const repositories = getSelectedRepo(key);
        const spareRepositories = repositories.filter(({_id})=> _id === id );
        setSelectedRepo(key,spareRepositories);
    }catch(e){
        console.error(e);
        alert(e);
    }
}

const countSelectedRepo = (key) => {
    return getSelectedRepo(key).length;
}

export {getSelectedRepo,setSelectedRepo,deleteSelectedRepo,countSelectedRepo};
