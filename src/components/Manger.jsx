import React, { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manger = () => {
    const [form, setform] = useState({ website: '', email: '', password: '' });
    const websiteRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const eyeIconRef = useRef();
    const [passwordArray, setPasswordArray] = useState([]);


    const getpasswords=async()=>{
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setPasswordArray(passwords)
    }
    useEffect(() => {
        // let password = localStorage.getItem("password");
        // if (password) {
        //     setPasswordArray(JSON.parse(password));
        // }

        getpasswords()
    }, []);

    const showPassword = () => {
        if (eyeIconRef.current.src.includes('icon/eyecross.png')) {
            eyeIconRef.current.src = 'icon/eye.png';
            passwordRef.current.type = 'password';
        } else {
            eyeIconRef.current.src = 'icon/eyecross.png';
            passwordRef.current.type = "text";
        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }

    const handleKeyDown = (e, nextRef) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (nextRef && nextRef.current) {
                nextRef.current.focus();
            } else {
                saveForm();
            }
        }
    };

    const saveForm = async() => {
        if (form.website.length > 3 && form.email.length > 3 && form.password.length > 3) {
            // const newEntry = { ...form, id: uuidv4() };
            // const updatedPasswordArray = [...passwordArray, newEntry];
            // setPasswordArray(updatedPasswordArray);
            
            // If any such id exists in the db, delete it 
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

            // localStorage.setItem("password", JSON.stringify(updatedPasswordArray));
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })

            // Otherwise clear the form and show toast
            
            setform({ website: '', email: '', password: '' });

            toast.warn('Password Saved!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false, 
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.warn('Your Input is less than 3!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const deleteForm = async (id) => {
        console.log("Deleting password with id ", id)
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true, 
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

    }
    const editForm = (id) => {
        setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div className='relative min-h-screen w-full'>
                <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-full w-full rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
                </div>
                <div className='mx-auto container flex flex-col justify-center md:items-center gap-5 md:gap-3'>
                    <div className="logo font-bold text-center text-white text-2xl">
                        <span className='text-green-500'> &lt;</span>
                        <span className='text-black'>Pass</span><span className='text-green-500'>OP/&gt;</span>
                    </div>
                    <h2 className='text-xl font-bold'>Welcome TO Password Manager</h2>
                    <div className=''>
                        <input
                            ref={websiteRef}
                            value={form.website}
                            onChange={handleChange}
                            onKeyDown={(e) => handleKeyDown(e, emailRef)}
                            className='address w-[100%] md:w-[800px] h-10 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                            type="text"
                            id='website'
                            name='website'
                            placeholder='Enter your Website Address'
                        />
                    </div>
                    <div className='md:flex items-center justify-center'>
                        <input
                            ref={emailRef}
                            value={form.email}
                            onChange={handleChange}
                            onKeyDown={(e) => handleKeyDown(e, passwordRef)}
                            className='w-[100%] sm:w[600px] md:w-[500px] p-2 h-10 border md:m-2 mb-5 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                            type="text"
                            name='email'
                            id='email'
                            placeholder='Enter your Email'
                        />
                        <div className='password div relative'>
                            <input
                            
                                ref={passwordRef}
                                value={form.password}
                                onChange={handleChange}
                                onKeyDown={(e) => handleKeyDown(e, null)}
                                className='w-[100%] sm:w[600x] md:w-[300px] p-2 h-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
                                type="password"
                                name='password'
                                id='password'
                                placeholder='Enter your Password'
                            />
                            <span className='absolute right-4 top-2'>
                                <img ref={eyeIconRef} src="icon/eye.png" alt="eye" width={25} height={25} onClick={showPassword} />
                            </span>
                        </div>
                    </div>
                    <button onClick={saveForm} className='bg-green-600 p-2 rounded-lg flex justify-center items-center hover:bg-green-400'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Add
                    </button>
                </div>
                <div className='line md:w-[60%] w-full mx-auto m-5 border border-green-500'></div>
                <h2 className='font-bold text-center text-2xl py-4'>Your Passwords</h2>
                <div className="flex items-center justify-center mb-6 w-[100%]">
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length !== 0 && (
                        <table className="table-fixed md:w-[60%] w-full rounded-md overflow-hidden mb-10">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Website</th>
                                    <th className='py-2'>UserName</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Edit</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-200 break-words p-4 space-x-5'>
                                {passwordArray.map((item, index) => (
                                    <tr key={index}>
                                        <td className='py-2 word-wrap border w-10 border-white text-center'>
                                            <a href={item.website} target='_blank'>{item.website}</a>
                                        </td>
                                        <td className='py-2 border border-white text-center'>{item.email}</td>
                                        <td className='py-2 border border-white text-center'>{item.password}</td>
                                        <td className='py-2 border border-white text-center'>
                                            <button onClick={() => { editForm(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover"
                                                    style={{ width: "25px", height: "25px" }}
                                                >
                                                </lord-icon>
                                            </button>
                                            <button onClick={() => { deleteForm(item.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/wpyrrmcq.json"
                                                    trigger="hover"
                                                    style={{ width: "25px", height: "25px" }}
                                                >
                                                </lord-icon>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
}

export default Manger;
