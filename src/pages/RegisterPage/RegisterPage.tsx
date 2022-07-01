import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useCreateUserMutation} from "../../services/ReduxService";
import {useState} from "react";
import authBackground from '../../images/1150365296-huge.jpg';
import { validate } from '../../helpers/FormValidation';
import CircularIndeterminate from "../../components/Loader";
import {useAppSelector} from "../../store/hooks/redux";

function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
      </Typography>
    );
}

const theme = createTheme();

export default function SignInSide() {
    const {isLoading} = useAppSelector(state => state.AuthSlice)
    
    const [createUser, {}] = useCreateUserMutation()
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState(formState);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = e.currentTarget
        setFormState({
            ...formState,
            [name]: value,
        })
        validate({name, value, setErrors, errors})
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await createUser(formState)
    };

    return (
      <ThemeProvider theme={theme}>
          <Grid container component="main" sx={{ height: '100vh' }}>
              <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                  <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                  >
                      <Typography sx={{ mb: 5}} component="h1" variant="h5">
                          Welcome
                      </Typography>
                      <Typography component="h1" variant="h4">
                          Sign up
                      </Typography>
                      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                          <TextField
                            error={errors.name.length !== 0}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="name"
                            name="name"
                            autoComplete="name"
                            onChange={handleChange}
                            helperText={errors.name}
                            autoFocus
                          />
                          <TextField
                            error={errors.email.length !== 0}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={handleChange}
                            helperText={errors.email}
                          />
                          <TextField
                            error={errors.password.length !== 0}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                            helperText={errors.password}
                          />
                          {isLoading ? <Button
                              disabled
                              type="submit"
                              fullWidth
                              variant="contained"
                              sx={{ mt: 3, mb: 2 }}
                          >
                              Sign Up
                          </Button>
                            :
                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                          }
                          {isLoading && <CircularIndeterminate />}
                          <Grid container>
                              <Grid item xs>
                                  <Link
                                    href="https://github.com/sotskiydr"
                                    variant="body2"
                                    rel="noopener noreferrer"
                                    target="_blank"
                                  >
                                      Created by @sotskiydr
                                  </Link>
                              </Grid>
                              <Grid item>
                                  <Link href="/login" variant="body2">
                                      {"LOGIN"}
                                  </Link>
                              </Grid>
                          </Grid>
                          <Copyright sx={{ mt: 5 }} />
                      </Box>
                  </Box>
              </Grid>
              <CssBaseline />
              <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url(${authBackground})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                      t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
              />
          </Grid>
      </ThemeProvider>
    );
}