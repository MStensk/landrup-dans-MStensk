import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";

export const useAuthStore = defineStore("auth", {
    state : () => ({
        authUser : null,
        userId : null,
        userData : null,
        rosterData : null,
        userRole : null
    }),
    getters : {
        isAuthenticated: (state) => {
          return !!state.authUser
        },
        user : (state) => state.authUser,
        roster : (state) => state.rosterData
    },
    actions : {

        async login({ username, password } : {username: string, password : string}) {
             try{
                const response = await axios.post('http://localhost:4000/auth/token', {
                  username,
                  password,
                });

                this.authUser = response.data.token 
                this.userId = response.data.userId
                this.userRole = response.data.role
                console.log('Login successful', response.data);
                console.log('userId after setting:', response.data.userId);
        } catch (error) {
            console.error("login failed: ", error)
        }
    },

    async fetchUserData() {
        try {
          const token = this.authUser;
          const userId = this.userId;
          const config = {
            headers: {
              Authorization: `Bearer ${token}`
            },
          };
          const response = await axios.get(`http://localhost:4000/api/v1/users/${userId}`, config);
          this.userData = response.data
          console.log('User data fetched successfully', response.data);
        } catch (error) {
          console.error('Failed to fetch user data', error);
        }
      },

      async getUserRoster({ userId, rosterId }: { userId: number, rosterId: number }) {
        try {
            const token = this.authUser;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            };
            const response = await axios.get(`http://localhost:4000/api/v1/users/${userId}/roster/${rosterId}`, config);
            this.rosterData = response.data;
            console.log('Roster data fetched successfully', response.data);
        } catch (error) {
            console.error('Failed to fetch roster data', error);
        }
      },

      logout() {
        this.authUser = null;
        this.userId = null;
        router.push('/login');
      },

      async signupForActivity(activityId: number) {
        try {
            const token = this.authUser;
            const userId = this.userId;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            };
            const response = await axios.post(`http://localhost:4000/api/v1/users/${userId}/activities/${activityId}`, null, config);
            console.log('Signup successful', response.data);
        } catch (error) {
            console.error('Signup failed', error);
        }
    },
    async removeUserFromActivity(activityId: number) {
      try {
          const token = this.authUser;
          const userId = this.userId;
          const config = {
              headers: {
                  Authorization: `Bearer ${token}`
              },
          };
          const response = await axios.delete(`http://localhost:4000/api/v1/users/${userId}/activities/${activityId}`, config);
          console.log('User removed successfully', response.data);
      } catch (error) {
          console.error('Failed to remove user', error);
      }
    }
    },
    
    
    
})