import MuiAlert from "@mui/material/Alert";
import styled from "@emotion/styled";

const StyledAlert = styled(MuiAlert) (({theme , variant}) => ({
    backgroundColor: "grey",
    color:"white",
}))

export default function Message({variant,childern}){
    return (
        <StyledAlert variant={variant} severity={variant}>
            {childern}
        </StyledAlert>
    )
}