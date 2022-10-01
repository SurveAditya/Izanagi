import axios from 'axios'
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from '../constants/userConstants'


//Here basically we are hitting the route /api/users/login(auth user in backend)
//from backend we are going to get _id name email isAdmin and token
// we are going to get those values back in this data passing that data as the payload
//then we also set that to local storage
export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      })
      
      //when we send the data we need to send the content type 
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      )
  
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      })
  
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    document.location.href = '/login'
  }

  export const register = (name, email, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.post(
        '/api/users',
        { name, email, password },
        config
      )
  
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      })
  
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      })
  
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_DETAILS_REQUEST,
      })

      //we are first deconstructing state which has user login
      //then we further deconstruct that to get userinfo
      const {
        userLogin: { userInfo },
      } = getState()
     
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/users/${id}`, config)
     
  
      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      })
    }
  }

  export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_UPDATE_PROFILE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.put(`/api/users/profile`, user, config)
  
      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      })
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      })
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload: message,
      })
    }
  }