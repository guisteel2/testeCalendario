<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import Calendar from '../Components/Calendar.vue';

import { useI18n } from 'vue-i18n'; // 👈 importa o sistema de tradução
const { t } = useI18n(); // 👈 função de tradução $t()

</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="text-xl font-semibold leading-tight text-gray-800">
                {{$t('Dashboard')}}
            </h2>
        </template>

        <div class="py-12">
            <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div class="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                    <div class="p-6 text-gray-900">
                        <Calendar />
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
