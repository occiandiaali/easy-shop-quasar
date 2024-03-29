import { defineStore } from 'pinia';
import {  ref } from 'vue';

export const useAppStore = defineStore('appStore', () => {
        
        const darkMode = ref(false);
        const useremail = ref(localStorage.getItem('userEmail') || '');
        const username = ref('');

    const toggleDarkMode = () => {
        darkMode.value = !darkMode.value;
        if(darkMode.value) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
    return {darkMode, toggleDarkMode, username, useremail}
})
