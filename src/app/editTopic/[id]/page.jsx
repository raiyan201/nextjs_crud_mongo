import EditForm from "../../../components/EditForm"


const getTopicsByID=async(id)=>{
  try {

    console.log('___id',id)

    const res= await fetch(`http://localhost:3000/api/topics/${id}`,{cache:"no-store"})
      console.log('res',res)
      if(!res.ok){
          throw new Error("failed to fetchd data");        
      }

      return res.json();

  } catch (error) {
    console.log(error)   

  }
}



const Page = async({params}) => {
  const {id}=params;
  console.log('ID', id);

  const {topic}=await getTopicsByID(id);
  console.log('topics',topic)

  const {title,description}=topic

    return <EditForm id={id} title={title} description={description} />
  }
  export default Page

  