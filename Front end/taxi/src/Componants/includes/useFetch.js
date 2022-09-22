import {useState , useEffect} from 'react'

function useFetch(url) {
    const [data,setData] = useState();

    useEffect(()=>{
        setTimeout(()=>{
            fetch(url)
            .then((response)=>{
                if(!response.ok){
                throw Error('data not found');
                }
                else{
                return response.json();
                }
            })
            .then((data)=>{
                setData(data);
            })
            .catch((err)=>console.log(err.message));
        },1000);

    },[url]);

    return (
        {data}
    )
}

export default useFetch;