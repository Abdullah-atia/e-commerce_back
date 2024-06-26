import React, { useState } from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { toast } from 'react-hot-toast'
import { BaseUrl } from '../../assets/Api.js/BaseUrl.jsx'

export default function Login({getuser}) {
  let[isLoading,setisLoding]=useState(false)
  let [ApiError,setApiError]=useState('')
  let nav=useNavigate()
  async function sendValues(values){
    setisLoding(true)
    let {data}=await axios.post(`${BaseUrl}/auth/signin`,values).catch(errors=>{
      setisLoding(false)
      setApiError(errors.response.data.message)
    })
    if(data.message==='success'){
      toast.success(data.message,{duration:1000,style:{color:'#0aad',borderRadius: '10px',
      background: '#330'},icon: '👏'})
      setisLoding(false)
      localStorage.setItem('token',data.token)
      getuser()
      nav('/')
    }
      
  }
  let validate=yup.object({
  
    email:yup.string().required("email is required").email("email not valid"),
    password:yup.string().required("password is required"),
 
  })
  let formik=useFormik({
    initialValues:{
   
      email:"",
      password:""
    },
    validationSchema:validate,
    onSubmit:sendValues

  })
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      
            <div className="w-md-50  m-auto py-5">
              {ApiError ? (
                <div className="alert alert-info">
                  <h5>{ApiError}</h5>
                </div>
              ) : (
                ""
              )}

              <div className="p-4 border border-1 rounded-4 shadow ">
                <h3 className="fw-bold">Sign in :</h3>
                <form className="" onSubmit={formik.handleSubmit}>
                  <label htmlFor="Email" className="fs-3">
                    Email :
                  </label>
                  <input
                    className="form-control my-2 fs-5"
                    onChange={formik.handleChange}
                    type="email"
                    value={formik.values.email}
                    id="email"
                    name="email"
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <div className="alert alert-info">
                      {formik.errors.email}
                    </div>
                  ) : null}

                  <label htmlFor="password" className="my-2 fs-3">
                    Password :
                  </label>
                  <input
                    className="form-control fs-5"
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.password}
                    id="password"
                    name="password"
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <div className="alert alert-info">
                      {formik.errors.password}
                    </div>
                  ) : null}

                  {isLoading ? (
                    <button
                      type="button"
                      className="btn bg-main text-white my-4"
                    >
                      <i className="fas fa-spinner fa-spin"></i>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-outline-success p-2  my-4"
                    >
                      login
                    </button>
                  )}
                </form>
              </div>
            
          {/* <div className="col-md-6">
    <div className="w-md-50  m-auto  py-5 ">
    <img src="https://media.istockphoto.com/id/1249219777/photo/shopping-online-concept-parcel-or-paper-cartons-with-a-shopping-cart-logo-in-a-trolley-on-a.jpg?s=612x612&w=0&k=20&c=EWKEahyVLY8iAHyirCCDESHRGW37lqUJ7In0SssNSLE=" className='w-100 h-100 py-5' alt="" />
    </div>
    </div> */}
        </div>
    
    </>
  );
}


