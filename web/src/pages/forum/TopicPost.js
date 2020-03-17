import React, { useContext } from 'react';
import { Icon, Box, Card, Grid, FormControl, TextField, FormHelperText, Button } from '@material-ui/core';
import Person from '../../layout/Person';
import { MainContext } from '../../context/MainContext';

const TopicPost = ( ) => {
    const { user } = useContext(MainContext);

    return (
        <Box mt={2}>
            <FormControl>
                <Card className="topic-post-card" raised elevation={4} >
                    <Box p={2}>
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                            >
                            <Box mb={2}>
                                <Person {...user} />
                            </Box>
                            <TextField
                                id="outlined-primary"
                                label="Votre message..."
                                variant="outlined"
                                color="primary"
                                multiline
                                rowsMax="20"
                                rows="5"
                                fullWidth
                            />
                            <FormHelperText id="my-helper-text">Soyez polis...</FormHelperText>
                            <Box fullwidth display="flex" m={1} p={1} justifyContent="flex-end" >
                                <Button variant="contained" color="primary"><Icon className="forum-send-post-icon" />Envoyer</Button>
                            </Box>
                        </Grid>
                    </Box>
                </Card>
            </FormControl>
        </Box>
    )

}


export default TopicPost;