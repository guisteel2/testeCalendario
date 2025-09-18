<template>
  <Dropdown align="right" width="48">
    <template #trigger>
        <span class="inline-flex rounded-md">
            <button
                type="button"
                class="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
            >
                <img
                    :src="currentFlag"
                    alt="Current Language"
                    class="h-5 w-5 rounded-full"
                />

                <svg
                    class="-me-0.5 ms-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                    />
                </svg>
            </button>
        </span>
    </template>

    <template #content >
        <button  @click="changeLanguage('pt'); setLang('pt')"
            class="dropdown-item notify-item language py-2 flex items-center w-full px-4 hover:bg-gray-100"
        >
            <img
                src="../../img/flag/brasil.svg"
                alt="Português"
                class="h-4 w-4 rounded me-2"
            />
            <span>Português</span>
        </button>

        <button
            @click="changeLanguage('en')"
            class="dropdown-item notify-item language py-2 flex items-center w-full px-4 hover:bg-gray-100">
            <img
                src="../../img/flag/us.svg"
                alt="English"
                class="h-4 w-4 rounded me-2"
            />
            <span>English</span>
        </button>
    </template>
</Dropdown>

</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

function setLang(lang) {
  locale.value = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
}

import { ref } from 'vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import { Link } from '@inertiajs/vue3';

const showingNavigationDropdown = ref(false);


import currentFlagBr from '../../img/flag/brasil.svg';
import currentFlagEn from '../../img/flag/us.svg';
const currentFlag = ref(locale.value === 'en' ? currentFlagEn : currentFlagBr);


function changeLanguage(lang) {
    //troca a img do lang
    this.setLang(lang);
    //Altere a flag no botão
  currentFlag.value = lang === 'en' ? currentFlagEn : currentFlagBr
  // Redireciona ou atualiza via Inertia
  router.visit(`/index/${lang}`)
}
</script>

<style scoped>
.lang-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
button {
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
