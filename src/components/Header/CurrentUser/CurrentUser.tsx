import React from 'react';
import { useGetCurrentUserQuery } from "../../../services/ReduxService";
import Typography from "@mui/material/Typography";


const CurrentUser = () => {
    const {data, isLoading, error} = useGetCurrentUserQuery('')
    return data ? <Typography variant="h6" component="h4" sx={{ flexGrow: 0.1 }}>
        {data.name}
    </Typography>
     : <Typography variant="h6" component="h4" sx={{ flexGrow: 0.1 }}>
    </Typography>
};

export default CurrentUser;
