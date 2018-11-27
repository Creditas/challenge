import React from 'react'
import './App.css'
import { UsersList } from './containers/UsersList'
import { MessagesList } from './containers/MessagesList'
import { AddMessage } from './containers/AddMessage'
import { Rooms } from './containers/Rooms'
import { AddRoom } from './containers/AddRoom'
import Grid from '@material-ui/core/Grid'
import 'typeface-roboto'

const App = () => (
  <Grid 
  id="main" 
  container 
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
  style={{ minHeight: '100vh' }}>
    <Grid id="chat-container" container md={8} sm={12}>
        <header>
          <svg style={{width: '30px', height: '30px'}} viewBox="0 0 24 24">
              <path fill="#bcd8f3" 
                    d="M17,12V3A1,1 0 0,0 16,2H3A1,1 0 0,0 2,3V17L6,13H16A1,1 0 0,0 17,12M21,6H19V15H6V17A1,1 0 0,0 7,18H18L22,22V7A1,1 0 0,0 21,6Z" 
              />
          </svg>
        </header>
        <Grid id="chat-content" container md={12} sm={12}>
          <Grid id="rooms-list" item md={3} sm={12} >
            <Rooms />
            <AddRoom />
          </Grid>
          <Grid item md={6} sm={12} style={{ padding: '15px' }}>
            <MessagesList />
            <AddMessage />
          </Grid>
          <Grid id="users-list" item md={3} sm={12}>
            <UsersList />
          </Grid>
        </Grid>  
    </Grid>
  </Grid>
)

export default App
