import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const getUserIdFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("userId")) || ""
}

const getUserTokenFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("token")) || ""
}

const token = getUserTokenFromLocalStorage()

export const getUser = createAsyncThunk("user/getUser", async (thunkAPI) => {
  try {
    const res = await axios.get("https://use-em-lose-em-server-bd575796a9b2.herokuapp.com/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (res.status === 200) {
      const res2 = await axios.get(
        `https://use-em-lose-em-server-bd575796a9b2.herokuapp.com/contestant/user/${res.data.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      return { user: res.data, leagues: res2.data }
    } else {
      return { user: res.data }
    }
  } catch (error) {
    return thunkAPI.rejectWithValue("something went wrong")
  }
})

const initialState = {
  user: false,
  userName: "",
  userId: getUserIdFromLocalStorage(),
  token: getUserTokenFromLocalStorage(),
  isLoading: false,
  leagues: [],
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const data = action.payload
      console.log(data)
      state.user = true
      state.userName = data.email
      state.userId = data.id
      state.token = data.token
      localStorage.setItem("userId", JSON.stringify(data.id))
      localStorage.setItem("token", JSON.stringify(data.token))
    },
    logoutUser: (state, action) => {
      state.user = false
      state.userName = ""
      state.userId = ""
      state.token = ""
      state.leagues = []
      localStorage.clear()
    },
    loadLeagues: (state, action) => {
      state.leagues = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        const { user, leagues } = action.payload
        state.user = true
        state.userName = user.email
        state.isLoading = false
        state.leagues = leagues
        localStorage.setItem("userId", JSON.stringify(user.id))
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false
        localStorage.setItem("userId", JSON.stringify(""))
      })
  },
})

export const { loginUser, logoutUser, loadLeagues } = userSlice.actions

export const userReducer = userSlice.reducer
