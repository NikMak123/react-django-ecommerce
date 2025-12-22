import CircularProgress from "@material-ui/core/CircularProgress"

export default function Loader(){
    return (
        <div style={{display:"flex" , justifyContent:"center" ,height:"500px"}}>
           <CircularProgress size={100}/>
        </div>
    )
}