import axios from "axios";

const API_URL = "http://localhost:3000/users";

export const userService = {
  registerUser: async (user) => {
    const res = await axios.post(API_URL, { ...user, todos: [] });

    if (res.status !== 201) {
      throw new Error("Failed to register, try again");
    }
     const userreg = res.data;
     console.log(res.data);
     localStorage.setItem("auth", userreg.id);
    return res.data;
  },

  loginUser: async (user) => {
    const res = await axios.get(`${API_URL}?email=${user.email}`, user);

    if (res.status !== 200) {
      throw new Error("Failed to login, try again");
    }

    const currentUser = res.data[0];
    if (!currentUser) {
      throw new Error("User not found");
    }

    if (currentUser.password !== user.password)
      throw new Error("Wrong Password");

    console.log(currentUser);
    localStorage.setItem("auth", currentUser.id);
  },

  auth: () => {
    return localStorage.getItem("auth");
  },

  logout: () => {
    localStorage.removeItem("auth");
  },
};
