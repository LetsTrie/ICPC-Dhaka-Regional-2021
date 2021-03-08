import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { contactUsAction } from '../../../action/contactUs';
import { CONTACT_INIT } from '../../../action/types';
import '../../../assests/css/contact.css';
import useFormFields from '../../HandleForms';
import Header from '../../ui/Header';
import Loader from '../../ui/Loader';
import AdminHeader from '../../ui/AdminHeader'
import TextField from '@material-ui/core/TextField'
import axios from 'axios';
import Autocomplete from 'react-autocomplete'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function ContactUs(props) {
  const classes = useStyles();

  // Initial State
const [state, setState] = useState({
  teams: '',
  receipents: '',
  subject: '',
  body: ''
})

const [teamName, setTeamName] = useState('')

const [singleTeam, setSingleTeam] = useState(true)

const [alert, setAlert] = useState({
  visible: false,
  msg: ''
})

const [Teams, setTeams] = useState(null)

useEffect(() => {
  if (Teams == null) {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem('token')
      }
    }
    axios.get('/api/v1/admin/getTeams', config).then(res => {
      const { teams } = res.data
      setTeams(teams)
    })
  } 
}, [])

  // Dispatch
const dispatch = useDispatch();

const handleChanges = e => {
  let temp = {...state}
  temp[e.target.name] = e.target.value
  setState(temp)
} 

const handleSubmit = async e => {
  e.preventDefault()

  let temp = { ...alert }
  temp.visible = true
  temp.msg = 'Email sending in progress. Please wait...'
  setAlert(temp)

  if (state.teams == 'Single team') {
    state['teamName'] = teamName
  }
  console.log(state)
  const headers = { 'Content-Type': 'application/json' }
  const res = await axios.post('/api/v1/admin/email', { data: state }, headers)

  if (res.data.success) {
    let temp = {...state}
    temp = {
      teams: '',
      teamName: '',
      subject: '',
      body: ''
    }

    let tempAlert = { ...alert }
    tempAlert.visible = true
    tempAlert.msg = res.data.msg
    setAlert(tempAlert)

    setState(temp)
    setTimeout(() => {
      tempAlert = { ...alert }
      // tempAlert.visible = false
      setAlert(tempAlert)
    }, 3000)
  }
}

useEffect(() => {
  if (state.teams == 'Single team') {
    setSingleTeam(true)
  } else {
    setSingleTeam(false)
  }
}, [state])

  return (
    <div>
      <div className="contact">
        <div className="contact__nav">
          <AdminHeader />
        </div>

        <div className="contact__header">
          <h1> Emails</h1>
        </div>

        <section>
          <div className="EmailBox">
            <div className='EmailPalette'>
              <div className='EmailContents'>

              <form onSubmit={handleSubmit}>
              {
                alert.visible && 
                  <Alert severity="success" style={{marginTop: '1.2rem'}}>
                    Email sent successfully. 
                </Alert>
                
              }
              <div className='flex-parent'>
                <div className='flex-child'>
                  <div className='title'><h3>Select teams</h3></div>
                  <div className='select-box'>
                    <select onChange={handleChanges} name='teams' value={state.teams} required>
                      <option value='' disabled > Select team</option>
                      <option value='All teams'>All teams</option>
                      <option value='Unpaid teams'>Unpaid teams</option>
                      <option value='Paid teams'>Paid teams</option>
                      <option value='Single team'>Single team</option>
                    </select>
                  </div>
                </div>

                <div className='flex-child'>
                  {/* <div className='title'><h3>Select receipents</h3></div>
                  <div className='select-box'>
                    <select name='receipents' onChange={handleChanges} value={state.receipents} required>
                    <option value='' disabled > Select receipents</option>
                      <option value='All members'>All members</option>
                      <option value='Coaches only'>Coaches only</option>
                      <option value='Members only'>Members only</option>
                    </select>
                  </div> */}

{
                singleTeam && Teams != null ? (<>
                  <div className='title'><h3>Select team name</h3></div>
                  <div className='select-box'>
                  <Autocomplete
                    getItemValue={(item) => item.label}
                    items={Teams.map(team => ({ label: team.Team_Name   }))}
                    renderItem={(item, isHighlighted) =>
                      <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                        {item.label}
                      </div>
                    }
                    value={teamName}
                    onChange={e => setTeamName(e.target.value)}
                    onSelect={val => setTeamName(val)}
                  />
                  </div></>) : <div></div>
              }

                </div>
              </div>

              <div className='single-parent'>

                <div className='single-child'>
                  {/* <div className='title'><h3>Subject</h3></div> */}
                  <div className='text-box'><TextField className='TextField' label='Subject' name='subject' onChange={handleChanges} value={state.subject} required/></div>
                </div>
                
              </div>

              <div className='single-parent'>

                <div className='single-child'>
                  {/* <div className='title'><h3>Subject</h3></div> */}
                  <div style={{fontSize: '12px', color: '#333', padding: '7.5px'}}>{`Use <team> and <name> as placeholders`}</div>
                  <div className='text-box'><textarea rows='10' name='body' onChange={handleChanges} value={state.body} required /></div>
                </div>
                
              </div>

              <div className="submitButton text-center">
                    <button type="submit">Submit</button>
              </div>

              </form>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  contact: state.contactUsReducer,
});

const mapDispatchToAction = { contactUsAction };
export default connect(mapStateToProps, mapDispatchToAction)(ContactUs);
