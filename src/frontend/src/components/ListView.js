import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
//component for list views
// will replace current views on party and character pages

function ListView(props) {
    console.log(props);
    const { data, message, handleDelete } = props;
    console.log(data.length);
    //pass in data of type object
    /**
     * data: {
     * primaryDescription:
     * secondaryDescription
     * link:
     * id
     * }
     */


    return (
    <span>
    { data.length === 0 ? <p>{`${message}`}</p> :
    <List>
    {data.map((list, index) => {
            return (
                    <ListItem button component={Link} divider key={index} to={list.link}>
                        <ListItemText
                            primary={list.primaryDescription}
                            secondary={list.secondaryDescription}
                        />
                        {handleDelete &&
                            <ListItemSecondaryAction>
                            <IconButton onClick={() => handleDelete(list.id)} edge="end">
                                        <DeleteIcon />
                            </IconButton>
                            </ListItemSecondaryAction>
                        }
                    </ListItem>
            )
    })}
    </List>}
    </span>);
}

ListView.propTypes = {
    data: PropTypes.array,
    message: PropTypes.string,
    handleDelete: PropTypes.func,
};

export default ListView;