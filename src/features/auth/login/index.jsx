import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../authSlice';
import { useLoginMutation } from '../authApi';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    const [username, setUser] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [username, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await login({ username, password }).unwrap();
            dispatch(setCredentials({ ...userData, username }));
            setUser('');
            setPwd('');
            navigate('/patients');
        } catch (err) {
            if (!err?.originalStatus) {
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };

    const handleUserInput = (e) => setUser(e.target.value);

    const handlePwdInput = (e) => setPwd(e.target.value);

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <section className="login">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                    {errMsg}
                </p>

                <h1 className="text-center">User Login</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            value={username}
                            onChange={handleUserInput}
                            autoComplete="off"
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={handlePwdInput}
                            value={password}
                            required
                            className="form-control"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Sign In
                    </button>
                </form>
            </section>
        </div>
    );
};

export default Login;
