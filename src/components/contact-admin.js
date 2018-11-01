import React from "react";
import { Auth } from "aws-amplify";
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

export default () => {
    function forceLogOut(){
        Auth.signOut();
    }
    return(
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2" gutterBottom={true}>
                Please contact your admin to be added to an authorized user group.
                </Typography>
                <Button onClick={forceLogOut} variant="contained">
                    <a href="/">Sign out</a>
                </Button>
            </CardContent>
        </Card>
    )
}
