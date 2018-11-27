import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const UsersList = ({ users }) => (
  <section>
    <Typography variant="overline" color="primary" gutterBottom>
        ONLINE USERS
    </Typography>
    <List component="nav">
      {users.map(user => (
        <ListItem>
          <ListItemText key={user.id} className="user-list-item" primary={user.name}  />
          <Divider light />
        </ListItem>
      ))}
    </List>

  </section> 
)

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default UsersList
