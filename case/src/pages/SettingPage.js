import React, {useContext, useCallback, useState, useEffect} from 'react'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'
import {NavLink, useHistory, useParams} from 'react-router-dom'
import {Flag} from '../components/FlagSetting'



export const Setting = () => {
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const auth = useContext(AuthContext)
    const {token} = useContext(AuthContext)
    const [forms, setForms] = useState({})
    useEffect( () => {
        console.log(error)
        message(error)
        clearError()
    }, [error, message])



  
    
    const getFlag = useCallback(async () => {
        try {
            const fetched = await request(`/api/auth/info`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setForms(fetched)
        } catch (e) {}


    }, [token, request])
    
    useEffect(() => {
        getFlag()
    }, [getFlag])
    
    return(
        <div className="row justify-content-center"> 
            <div className='block-dio '>
                <form className='form-1 col s12'>
                    <div className='mb-3'>
                        <p className='p-log'>Режим:</p>
                        { !loading && <Flag flag={forms} /> }
                    </div>
                </form>
            </div>
        </div> 
    )
}