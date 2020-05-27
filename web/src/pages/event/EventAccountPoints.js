import React, { useState, useEffect, Fragment, useContext } from 'react';
import { Icon, Button, Dialog, DialogActions, DialogContent, DialogTitle, Box, FormControl, Select } from '@material-ui/core';
import { useInput } from '../../hooks/input';
import {MainContext} from '../../context/MainContext';
import {appConfig} from "../../config/appConfig"

const EventAccountPoints = ({ is_open, handleClose, event_id, difficulty, battleroyale, is_competitive, house } ) => {
    const { value:firstPlace,  bind:bindFirstPlace } = useInput('');
    const { value:secondPlace,  bind:bindSecondPlace } = useInput('');
    const { value:thirdPlace,  bind:bindThirdPlace } = useInput('');
    const { setDialog } = useContext(MainContext);
    

    const handleAccountPointsClick = () => {
        let eventType;
        eventType = battleroyale ? 'individual' : 'global';
        if(house && house.house_id) eventType = 'house';
        fetch(appConfig.api_url + 'event/result/'+eventType, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: "&first_id=" + parseInt(firstPlace) + "&second_id=" + parseInt(secondPlace) + "&third_id=" + parseInt(thirdPlace) + "&event_id=" + parseInt(event_id) + "&difficulty=" + ( difficulty ? difficulty : -1 )
        })
        .then(response => response.json())
        .then(({status, dialog_id}) => {
            setDialog({
                [dialog_id]: {
                    is_open: true
                }
            });
        });  
    }

    return (
        <Dialog
            open={ is_open }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            onClose={ handleClose }
            fullWidth 
            maxWidth = {'sm'}
        >
            <DialogTitle id="alert-dialog-title">Clôturer les points</DialogTitle>
            <DialogContent>
            
            </DialogContent>
            <Box m={1} />
                { is_competitive === 1 && battleroyale === 1 && <HumanSelector { ...{ event_id, bindFirstPlace, bindSecondPlace, bindThirdPlace } } /> }
                { is_competitive === 1 && battleroyale === 0 && !house && <HouseSelector { ...{ event_id, bindFirstPlace, bindSecondPlace, bindThirdPlace } } /> }
            <DialogActions>
            
            <Button
                    color="primary"
                    endIcon={<Icon>send</Icon>}
                    onClick={ handleAccountPointsClick } 
                >
                    Clôturer2
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const HumanSelector = ({ event_id, bindFirstPlace, bindSecondPlace, bindThirdPlace}) => {
    const [ participants, setParticipants] = useState();
    useEffect(() => {
        fetch(appConfig.api_url + 'event/get_user_participants', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: "&event_id=" + event_id
        })
        .then(response => response.json())
        .then((data) => {
            setParticipants(data);
        }); 
    }, [setParticipants, event_id]);

    return (
        <Fragment>
            <FormControl variant="outlined" style={ styles.DropDown }>
                <Select
                    native
                    { ...bindFirstPlace }
                >
                    <option value={-1}>Choisir la première place</option>
                    {
                    participants && participants.length > 0 && participants.map(( { participant : { user_id, firstname, lastname }} ) => 
                        <option value={ user_id }>{ firstname + ' ' + lastname } </option>
                    )
                    } 
                    
                </Select>
            </FormControl> 
            <FormControl variant="outlined" style={ styles.DropDown }>
                <Select
                    native
                    { ...bindSecondPlace }
                >
                    <option value={-1}>Choisir la deuxième place</option>
                    {
                    participants && participants.length > 0 && participants.map(( { participant : { user_id, firstname, lastname }} ) => 
                        <option value={ user_id }>{ firstname + ' ' + lastname } </option>
                    )
                    } 
                    
                </Select>
            </FormControl> 
            <FormControl variant="outlined" style={ styles.DropDown }>
                <Select
                    native
                    { ...bindThirdPlace }
                >
                    <option value={-1}>Choisir la troisième place</option>
                    {
                    participants && participants.length > 0 && participants.map(( { participant : { user_id, firstname, lastname }} ) => 
                        <option value={ user_id }>{ firstname + ' ' + lastname } </option>
                    )
                    } 
                    
                </Select>
            </FormControl> 
        </Fragment>
        )
}

const HouseSelector = ({ event_id, bindFirstPlace, bindSecondPlace, bindThirdPlace}) => {
    const [ participants, setParticipants] = useState();
    useEffect(() => {
        fetch(appConfig.api_url + 'event/get_house_participants', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: "&event_id=" + event_id
        })
        .then(response => response.json())
        .then((data) => {
            setParticipants(data);
        }); 
    }, [setParticipants, event_id]);
    
    return (
        <Fragment>
            
            <FormControl variant="outlined" style={ styles.DropDown }>
                <Select
                    native
                    { ...bindFirstPlace }
                >
                    <option value={-1}>Choisir la première place</option>
                    {
                     participants && participants.length > 0 && participants.map(( { house_id, name } ) => 
                        <option value={ house_id }>{ name } </option>
                    )
                    } 
                    
                </Select>
            </FormControl> 
            <FormControl variant="outlined" style={ styles.DropDown }>
                <Select
                    native
                    { ...bindSecondPlace }
                >
                    <option value={-1}>Choisir la deuxième place</option>
                    {
                    participants && participants.length > 1 && participants.map(( { house_id, name } ) => 
                        <option value={ house_id }>{ name } </option>
                    )
                    } 
                    
                </Select>
            </FormControl> 
            <FormControl variant="outlined" style={ styles.DropDown }>
                <Select
                    native
                    { ...bindThirdPlace }
                >
                    <option value={-1}>Choisir la troisième place</option>
                    {
                    participants && participants.length > 2 && participants.map(( { house_id, name } ) => 
                        <option value={ house_id }>{ name } </option>
                    )
                    } 
                    
                </Select>
            </FormControl> 
                
        </Fragment>
        )
}



const styles = {
    DropDown : {
        margin:'10px'
    }
}


export default EventAccountPoints;