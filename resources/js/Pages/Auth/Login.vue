<script setup>
import { useForm } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n'; // 👈 importa o sistema de tradução

import Checkbox from '@/Components/Checkbox.vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, Link } from '@inertiajs/vue3';

// Props
defineProps({
    canResetPassword: Boolean,
    status: String,
});

// useForm
const form = useForm({
    email: '',
    password: '',
    remember: false,
});

// useI18n
const { t } = useI18n(); //função de tradução $t()

// Função de submissão
const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};

//Função para traduzir erros do backend
const translateError = (error) => {
    const errorMap = {
        'These credentials do not match our records.': t('auth.failed'),
        'The email field is required.': t('auth.invalid_email'),
        'The password field is required.': t('auth.invalid_password'),
    };

    return errorMap[error] || error;
};

const handleInvalidEmail = (event) => {
    event.preventDefault();  // Impede o comportamento padrão do navegador

    // Verifica se o e-mail contém "@"
    if (!form.email.includes('@')) {
        form.errors.email = t('validation.invalid_email_with_at', { email: form.email });
    } else {
        const email = form.email;
        const domainPart = email.split('@')[1] || '';
        if (!domainPart.includes('.')) {
            form.errors.email = t('auth.invalid_email');
            form.email = '';
        } else {
            return 'valido';
        }
    }

    // Define a mensagem personalizada de erro
    const emailInput = event.target;
    if (!domainPart.includes('.')) {
            form.email = '';
        }
    emailInput.setCustomValidity(form.errors.email);  // Define a mensagem personalizada
    emailInput.reportValidity();  // Exibe a mensagem de erro
};

const handleInvalidPassword = (event) => {
    if(handleInvalidEmail == 'valido'){
        event.preventDefault(); // Impede a mensagem padrão do navegador

        // Mensagem personalizada via i18n
        form.errors.password = t('auth.password_required');

        // Aplica a mensagem no campo
        const passwordInput = event.target;
        passwordInput.setCustomValidity(form.errors.password);
        passwordInput.reportValidity();
    }
};
</script>


<template>
    <GuestLayout>
        <Head title="Log in" />

        <div v-if="status" class="mb-4 text-sm font-medium text-green-600">
            {{ status }}
        </div>

        <form @submit.prevent="submit">
            <div>
                <InputLabel for="email" :value="$t('Email')" />

                <TextInput
                    id="email"
                    type="email"
                    class="mt-1 block w-full"
                    v-model="form.email"
                    required
                    @invalid="handleInvalidEmail"
                    autofocus
                    autocomplete="username"
                />

                <InputError class="mt-2" :message="form.errors.email ? translateError(form.errors.email) : ''" />
            </div>

            <div class="mt-4">
                <InputLabel for="password" :value="$t('Password') " />

                <TextInput
                    id="password"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password"
                    required
                    @invalid="handleInvalidPassword"
                    autocomplete="current-password"
                />

                <InputError class="mt-2" :message="form.errors.password ? translateError(form.errors.password) : ''" />
            </div>

            <div class="mt-4 block">
                <label class="flex items-center">
                    <Checkbox name="remember" v-model:checked="form.remember" />
                    <span class="ms-2 text-sm text-gray-600"
                        >{{$t('Remember me')}} </span
                    >
                </label>
            </div>

            <div class="mt-4 flex items-center justify-end">
                <Link
                    v-if="canResetPassword"
                    :href="route('password.request')"
                    class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    {{$t('Forgot your password?')}}
                </Link>

                <PrimaryButton
                    class="ms-4"
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                >
                    {{ $t('Log in') }}
                </PrimaryButton>
            </div>
        </form>
    </GuestLayout>
</template>

