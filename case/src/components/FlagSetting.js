import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import { useMessage } from '../hooks/message.hook'
import {Loader} from '../components/Loader'
import {LineChart, ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis,YAxis, Tooltip, Legend, Line} from 'recharts'
const moment = require('moment')


export const Flag = ({ flag } ) => {
    const message = useMessage()
    const auth = useContext(AuthContext)
    const {token} = useContext(AuthContext)
    const {loading, error, request, clearError} = useHttp()
    const [fors, setFor] = useState({
        flag: flag.flag
    })
    const [code, setCode] = useState({
        coden: '', email: flag.email
    })

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    useEffect( () => {
        console.log(error)
        message(error)
        clearError()
    }, [error, message])


    const changeHandler = event => {
        console.log(event.target.value)
        setFor({ ...fors, [event.target.name]: event.target.value})
    }
    const changeHandler_2 = event => {
        console.log(event.target.value)
        setCode({ ...code, [event.target.name]: event.target.value})
    }

    const generatenewcodeHalder = async () =>{
        try{
            const data = await request('/api/auth/generate_code_3', 'POST', {...code}, {
                Authorization: `Bearer ${auth.token}`
                })
            setCode({ ...code})
            message(data.message)
        }catch(e){}
    }

    const saveHaldler = async () =>{
        try{
            const data = await request('/api/auth/save', 'POST', {...fors, ...code}, {
                Authorization: `Bearer ${auth.token}`
                })
            window.location= '/setting'
            message(data.message)
        
        }catch(e){}
    }

    console.log(flag.flag)
    if (flag.flag === '1'){
        return(
            <div className='flag-setting-2'>
                <p className='p-log-2' >Сейчас у вас режим &laquo;Пользовательский&raquo;</p>
                <div class="custom-control custom-radio rb-1">
                    <input onChange={changeHandler} name='flag' type="radio" value='1' id="customRadio1" class="custom-control-input" autoFocus/>
                    <label class="custom-control-label lb-1" for="customRadio1">Пользователський</label>
                </div>

                <div class="custom-control custom-radio rb-2">
                    <input onChange={changeHandler} name='flag' type="radio" value='2' id="customRadio2" class="custom-control-input" />
                    <label class="custom-control-label lb-1" for="customRadio2">Соренование</label>
                </div>
                <br />

                <a  href='#!'data-toggle="modal" onClick={generatenewcodeHalder} data-target="#exampleModal" className="btn btn-primary"  disabled={loading}>Сохранить</a>


            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Подтверждение</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <input type="text" placeholder="Введите код" name="coden" onChange={changeHandler_2} />
                             <a href = '#' onClick={generatenewcodeHalder}  disabled={loading}>Отправить ещё раз</a><br />
                            <a data-dismiss="modal" className="btn btn-primary modal-btn" onClick={saveHaldler} href='#'>Готово!</a>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )

    }
    return(
        <div className='flag-setting-2'>
            <p className='p-log-2' >Сейчас у вас режим &laquo;Соревнование&raquo;</p>
            <div class="custom-control custom-radio rb-1">
                <input onChange={changeHandler} name='flag' type="radio" value='1' id="customRadio1" class="custom-control-input" />
                <label class="custom-control-label lb-1" for="customRadio1">Пользователський</label>
            </div>

            <div class="custom-control custom-radio rb-2">
                <input type="radio" id="customRadio2" onChange={changeHandler} name='flag' value='2' class="custom-control-input" autoFocus/>
                <label class="custom-control-label lb-1" for="customRadio2">Соренование</label>
            </div>
            <br />
            <a  href='#!'data-toggle="modal" onClick={generatenewcodeHalder} data-target="#exampleModal" className="btn btn-primary"  disabled={loading}>Сохранить</a>


            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Подтверждение</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <input type="text" placeholder="Введите код" name="coden" onChange={changeHandler_2} />
                            <a href = '#' onClick={generatenewcodeHalder}  disabled={loading}>Отправить ещё раз</a><br />
                            <a data-dismiss="modal" className="btn btn-primary modal-btn" onClick={saveHaldler} href='#'>Готово!</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}