const KEY = 'selectRepo';
const getSelectedRepo = () =>{
    try{
        return JSON.parse(localStorage.getItem(KEY) || '[]');
    }catch(e){
        console.error(e);
        alert(e);
    }
}

const setSelectedRepo= (item) => {
    localStorage.setItem(KEY,JSON.stringify(item));
};


const deleteSelectedRepo = (id)=>{
    try{
        const repositories = getSelectedRepo();
        const spareRepositories = repositories.filter(({id:_id})=> _id !== id );
        setSelectedRepo(spareRepositories);
    }catch(e){
        console.error(e);
        alert(e);
    }
}

const countSelectedRepo = () => {
    return getSelectedRepo().length;
}

export {getSelectedRepo,setSelectedRepo,deleteSelectedRepo,countSelectedRepo};
