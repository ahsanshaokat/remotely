import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosFetch, generateImageURL } from '../../../utils';
import './Register.scss'

const Register = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formInput, setFormInput] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    phone: '',
    description: '',
    isSeller: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();

    for (let key in formInput) {
      if (formInput[key] === '') {
        toast.error('Please fill all input field: ' + key);
        return;
      }
      else if (key === 'phone' && formInput[key].length < 9) {
        toast.error('Enter valid phone number!');
        return;
      }
    }

    setLoading(true);
    try {
      // const { url } = await generateImageURL(image);
      const { data } = await axiosFetch.post('/auth/register', { ...formInput, image: null });
      toast.success('Registration successful!');
      setLoading(false);
      navigate('/login');
    }
    catch ({ response }) {
      toast.error(response.data.message);
      setLoading(false);
    }
  }

  const handleChange = (event) => {
    const { value, name, type, checked } = event.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setFormInput({
      ...formInput,
      [name]: inputValue
    });
  }

  return (
    <><div className="register"><CssVarsProvider>
      <main>
        <Sheet
          sx={{
            width: 950,
            mx: 'auto', // margin left & right
            my: 4, // margin top & bottom
            py: 5, // padding top & bottom
            px: 5, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            background: 'white',
            gap: 2,
            borderRadius: '30px',
            boxShadow: 'md',
          }}
          variant="outlined"
        >
          <div>
            <Typography level="h3" component="h1">
              <b>Create a new account</b>
            </Typography>
          </div>
          <form action="" onSubmit={handleSubmit}>

            <div className="left">
              <FormControl>
                <FormLabel>Full Name</FormLabel>
                <Input
                  name='fullname' placeholder='John Doe' onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  name='username' placeholder='johndoe' onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Email Address</FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="email"
                  onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  // html input attribute
                  name='password' type='password' placeholder='password' onChange={handleChange} />
              </FormControl>

              <FormControl sx={{ display: 'none'}}>
                <FormLabel>Profile Picture</FormLabel>
                <Input
                  type="file" onChange={(event) => setImage(event.target.files[0])} />
              </FormControl>
              
              <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Register'}</button>
              {/* <span>{error && error}</span> */}
            </div>
            <div className="right">
            <p>Already have an account? <Link to='/login'>Signin</Link></p>
            <h1>I am a client, hiring for a project</h1>
            <div className="toggle">
              <label htmlFor="">Activate the client account</label>
              <label className="switch">
                <input type="checkbox" name='isSeller' onChange={handleChange} />
                <span className="slider round"></span>
              </label>
            </div>
            <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  name="phone"
                  type="text"
                  placeholder="+1 1234 567 890"
                  onChange={handleChange} />
              </FormControl>

              <textarea
              placeholder="A short description of yourself"
              name="description"
              id=""
              cols="30"
              rows="10"
              onChange={handleChange}
            ></textarea>
            </div>
          </form>
        </Sheet>
      </main>
    </CssVarsProvider></div></>
  )
}

export default Register