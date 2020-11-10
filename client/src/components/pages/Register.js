import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Alert from '@material-ui/lab/Alert';
import { Link, useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'

import '../../assests/css/auth.css';
import logo from '../../assests/images/icpc_logo.png';
import validate from '../../utils/RegValidation';
import Header from '../ui/Header';
import { register } from '../../action/index';
import { useDispatch, useSelector } from 'react-redux';
import { Fade } from '@material-ui/core';

import CustomTextField from '../ui/CustomTextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles({
  TextField: {
    width: '50%',
    marginRight: '1rem',
    marginBottom: '1.8rem',
  },
  formControl: {
    width: '50%',
    marginRight: '1rem',
    marginBottom: '1.8rem',
  },
});

const Register = () => {
  const classes = useStyles();

  const auth = useSelector((state) => state.auth);

  const [state, setState] = React.useState({
    age: '',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  useEffect(() => {
    if (auth.user) {
      history.push('/');
    }
    if (auth.error == true) {
      setAlert(auth);
      setDisable(false);
    } else if (auth.error == false) {
      setAlert(auth);
      setTimeout(() => {
        history.push('/login');
      }, 3000);
    }
  });

  const addMember = (e) => {
    if (membersInfo.length < 3) {
      setMembersInfo([
        ...membersInfo,
        {
          memberFirstName: '',
          memberLastName: '',
          memberYear: '',
          memberSemester: '',
          memberEmail: '',
          tshirtSize: ''
        },
      ]);
    }
  };
  const deleteMember = (e, i) => {
    if (membersInfo.length > 1) {
      const mInfo = [...membersInfo];
      mInfo.splice(i, 1);
      setMembersInfo(mInfo);
      console.log(membersInfo);
    }
  };

  const [teamInfo, setTeamInfo] = useState({
    teamName: '',
    coachName: '',
    university: '',
    email: '',
    password: '',
    conPassword: '',
  });
  const [membersInfo, setMembersInfo] = useState([
    {
      memberFirstName: '',
      memberLastName: '',
      memberYear: '',
      memberSemester: '',
      memberEmail: '',
      tshirtSize: '',
      image: null,
    },
    {
      memberFirstName: '',
      memberLastName: '',
      memberYear: '',
      memberSemester: '',
      memberEmail: '',
      tshirtSize: '',
      image: null,
    },
  ]);
  const [images, setImages] = useState([]);
  const [alert, setAlert] = useState(null);
  const [btnDisable, setDisable] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const submit = (e) => {
    const data = {
      teamInfo,
      membersInfo,
    };
    const check = validate(data);
    if (!check.error) {
      const team = {
        teamName: teamInfo.teamName,
        coachFirstName: teamInfo.coachFirstName,
        coachLastName: teamInfo.coachLastName,
        university: teamInfo.university,
        email: teamInfo.email,
        password: teamInfo.password,
        conPassword: teamInfo.conPassword,
        membersInfo,
      };
      console.log(team)
      // dispatch(register(team));
      setDisable(true);
    } else {
      setAlert(check);
    }
  };
  const textStyles = {
    width: '100%',
    marginTop: '15px',
  };
  const linkStyles = {
    textDecoration: 'none',
    color: '#5499C7',
  };
  const handleInputs = (e, i) => {
    console.log(e.target.value)
    const info = [...membersInfo];
    info[i][e.target.name] = e.target.value;
    setMembersInfo(info);
  };
  const handleTeamInfo = (e) => {
    const team = teamInfo;
    team[e.target.name] = e.target.value;
    setTeamInfo(team);
  };
  const handleImageInputs = (e, i) => {
    const img = [...images];
    const info = [...membersInfo];
    img[i] = e.target.files[0];
    info[i].image = e.target.files[0].name;
    setImages(img);
    setMembersInfo(info);
  };

  return (
    <div className='register_wrapper'>
      <Header />
      <div className='register'>
        <div className='register_container'>
          <div className='register_logo'>
            <img src={logo} alt='icpc logo' />
          </div>
          <div className='register_your_team'>
            <p>Register Your Team</p>
          </div>
          <div className='register_flex'>
            <div className='register_flex_left'>
              {alert && (
                <Alert
                  variant='filled'
                  severity={alert.error ? 'error' : 'success'}
                >
                  {alert.msg}
                </Alert>
              )}
              <div className='secondary_heading'>
                <p> Team Information </p>
              </div>
              <div className='flex_row'>
                <CustomTextField
                  className={classes.TextField}
                  name='teamName'
                  label='Team name'
                  onChange={(e) => handleTeamInfo(e)}
                  type='text'
                />
                <CustomTextField
                  className={classes.TextField}
                  name='university'
                  label='University'
                  onChange={(e) => handleTeamInfo(e)}
                  type='text'
                />
              </div>
              <div className='flex_row'>
                <CustomTextField
                  className={classes.TextField}
                  name='coachName'
                  label='Coach name'
                  onChange={(e) => handleTeamInfo(e)}
                  type='text'
                />
                <CustomTextField
                  className={classes.TextField}
                  name='coachEmail'
                  label='Coach email'
                  onChange={(e) => handleTeamInfo(e)}
                  type='text'
                />
              </div>

              <div className='flex_row'>
                <CustomTextField
                  className={classes.TextField}
                  name='password'
                  label='Password'
                  onChange={(e) => handleTeamInfo(e)}
                  type='password'
                />
                <CustomTextField
                  className={classes.TextField}
                  name='conPassword'
                  label='Confirm password'
                  onChange={(e) => handleTeamInfo(e)}
                  type='password'
                />
              </div>

              <div
                className='secondary_heading'
                style={{ paddingTop: '2.2rem' }}
              >
                <p> Members Information </p>
              </div>

              <div className='team_members'>
                {membersInfo.map((member, i) => (
                  <div>
                    <div className='member_count'>
                      <p>Participant {i + 1}</p>
                    </div>
                    <div className='flex_row'>
                      <CustomTextField
                        className={classes.TextField}
                        name='memberName'
                        label='Participant name'
                        onChange={(e) => handleInputs(e, i)}
                        type='text'
                      />
                      <CustomTextField
                        className={classes.TextField}
                        name='memberEmail'
                        label='Participant email'
                        onChange={(e) => handleInputs(e, i)}
                        type='text'
                      />
                    </div>
                    <div className='flex_row'>
                      <FormControl
                        variant='outlined'
                        className={classes.formControl}
                      >
                        <InputLabel
                          htmlFor='outlined-age-native-simple'
                          className={classes.label}
                        >
                          Year
                        </InputLabel>
                        <Select
                          native
                          value={member.memberYear}
                          onChange={e => handleInputs(e, i)}
                          label='Age'
                          inputProps={{
                            name: 'memberYear',
                            id: 'outlined-age-native-simple',
                            style: { fontSize: '1.6rem' },
                          }}
                          InputLabelProps={{
                            style: {
                              fontSize: '1.45rem',
                              background: 'white',
                              paddingRight: '5px',
                            },
                          }}
                        >
                          <option aria-label='None' value='' />
                          <option value={'1st'}>1st</option>
                          <option value={'2nd'}>2nd</option>
                          <option value={'3rd'}>3rd</option>
                          <option value={'4th'}>4th</option>
                          <option value={'Masters'}>Masters</option>
                          <option value={'Others'}>Others</option>
                        </Select>
                      </FormControl>
                      <FormControl
                        variant='outlined'
                        className={classes.formControl}
                      >
                        <InputLabel
                          htmlFor='outlined-age-native-simple'
                          className={classes.label}
                        >
                          Semester
                        </InputLabel>
                        <Select
                          native
                          value={member.memberSemester}
                          onChange={e => handleInputs(e, i)}
                          label='Age'
                          inputProps={{
                            name: 'memberSemester',
                            id: 'outlined-age-native-simple',
                            style: { fontSize: '1.6rem' },
                          }}
                          InputLabelProps={{
                            style: {
                              fontSize: '1.45rem',
                              background: 'white',
                              paddingRight: '5px',
                            },
                          }}
                        >
                          <option aria-label='None' value='' />
                          <option value={'1st'}>1st</option>
                          <option value={'2nd'}>2nd</option>
                          <option value={'3rd'}>3rd</option>
                          <option value={'4th'}>4th</option>
                        </Select>
                      </FormControl>
                    </div>
                    <div className='flex_row'>
                      <FormControl
                        variant='outlined'
                        className={classes.formControl}
                      >
                        <InputLabel
                          htmlFor='outlined-age-native-simple'
                          className={classes.label}
                        >
                          Tshirt Size
                        </InputLabel>
                        <Select
                          native
                          value={member.tshirtSize}
                          onChange={e => handleInputs(e, i)}
                          label='Age'
                          inputProps={{
                            name: 'tshirtSize',
                            id: 'outlined-age-native-simple',
                            style: { fontSize: '1.6rem' },
                          }}
                          InputLabelProps={{
                            style: {
                              fontSize: '1.45rem',
                              background: 'white',
                              paddingRight: '5px',
                            },
                          }}
                        >
                          <option aria-label='None' value='' />
                          <option value={'S'}>S</option>
                          <option value={'M'}>M</option>
                          <option value={'XL'}>XL</option>
                          <option value={'Others'}>Others</option>
                        </Select>
                      </FormControl>
                      <div>
                        <label htmlFor=''>Upload Image</label>
                        <br/>
                        <input
                          type='file'
                          name='image'
                          onChange={(e) => handleImageInputs(e, i)}
                        />
                      </div>
                    </div>

                    {/* <div className='side'>
                      <select
                        name='memberYear'
                        onChange={(e) => handleInputs(e, i)}
                      >
                        <option value={''}>Year</option>
                        <option value={'1st'}>1st</option>
                        <option value={'2nd'}>2nd</option>
                        <option value={'3rd'}>3rd</option>
                        <option value={'4th'}>4th</option>
                        <option value={'Masters'}>Masters</option>
                        <option value={'Others'}>Others</option>
                      </select>

                      <select
                        name='memberSemester'
                        onChange={(e) => handleInputs(e, i)}
                      >
                        <option value={''}>Semester</option>
                        <option value={'1st'}>1st</option>
                        <option value={'2nd'}>2nd</option>
                        <option value={'3rd'}>3rd</option>
                        <option value={'4th'}>4th</option>
                      </select>
                    </div> */}
                    {/* <div className='side'>
                      <select
                        name='tshirtSize'
                        onChange={(e) => handleInputs(e, i)}
                      >
                        <option value={''}>Tshirt size</option>
                        <option value={'S'}>S</option>
                        <option value={'M'}>M</option>
                        <option value={'L'}>L</option>
                        <option value={'XL'}>XL</option>
                      </select>
                    </div> */}
                    <br />
                  </div>
                ))}
                <Button
                  style={{ marginTop: '10px' }}
                  variant='contained'
                  onClick={addMember}
                >
                  Add Member
                </Button>
              </div>
              <p>
                Have an account?
                <Link style={linkStyles} to='/login'>
                  Sign in
                </Link>
              </p>
            </div>
            <div className='register_flex_right'>
              <h3>Payment</h3>
              <div className='lines'>
                <div className='line'>
                  <span className=''>Registration fees</span>
                  <span>2000/-</span>
                </div>
                <div className='line'>
                  <span className=''>Charges</span>
                  <span>50/-</span>
                </div>
                <hr />
                <div className='line' style={{ color: '#f50057' }}>
                  <span className='bold'>Total</span>
                  <span>2050/-</span>
                </div>
              </div>
              <div className='payment-options'>
                <FormControl style={{ marginTop: '50px' }} component='fieldset'>
                  <FormLabel component='legend'>
                    <h4>Payment Method</h4>
                  </FormLabel>
                  <RadioGroup aria-label='gender' name='gender1'>
                    <FormControlLabel
                      value='bkash'
                      control={<Radio />}
                      label='bKash'
                    />
                    <FormControlLabel
                      value='sslcommerz'
                      control={<Radio />}
                      label='SSLCommerz'
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <p style={{ textAlign: 'center' }}>
                <Button
                  style={{ marginTop: '120px', width: '50%' }}
                  variant='contained'
                  onClick={submit}
                  disabled={btnDisable}
                  color='secondary'
                >
                  Submit
                </Button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
