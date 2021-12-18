 import Class from './../Class/Class'
 
 const ClassPage=()=>{

    return (
        <div >
        <Class className='one' outOf={30} placesLeft={2}/>
        <Class className='two' outOf={20} placesLeft={8}/>
      </div>
      )
}
export default ClassPage;