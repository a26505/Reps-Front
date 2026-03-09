<script setup lang="ts">
import { ref } from 'vue';
import { contactoApi } from '@/api';

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const submitStatus = ref<'idle' | 'success' | 'error'>('idle');
const statusMessage = ref('');

const submitForm = async () => {
    // Basic validation
    if (!form.value.name || !form.value.email || !form.value.subject || !form.value.message) {
        submitStatus.value = 'error';
        statusMessage.value = "Por favor completa todos los campos obligatorios.";
        return;
    }

    isSubmitting.value = true;
    submitStatus.value = 'idle';
    statusMessage.value = '';

    try {
        const response = await contactoApi.enviarMensaje(form.value);
        
        if (response.data.success) {
            submitStatus.value = 'success';
            statusMessage.value = response.data.message || "¡Mensaje enviado con éxito!";
            form.value = { name: '', email: '', subject: '', message: '' };
        } else {
            throw new Error(response.data.error || 'Error desconocido');
        }
    } catch (error: any) {
        console.error('Error al enviar mensaje:', error);
        submitStatus.value = 'error';
        statusMessage.value = error.response?.data?.error || error.message || "Error al enviar el mensaje. Por favor, inténtalo de nuevo.";
    } finally {
        isSubmitting.value = false;
    }
};

<template>
  <div class="contact-form-height h-full">
      <div class="form-container h-full">
        <h3 class="text-h5 font-weight-bold text-white mb-6">Envíanos un Mensaje</h3>

        <form @submit.prevent="submitForm">
             <div class="form-group mb-4">
                <label for="name" class="form-label">Nombre Completo <span class="text-red">*</span></label>
                <input type="text" id="name" v-model="form.name" placeholder="Tu nombre" class="form-input" required>
             </div>

             <div class="form-group mb-4">
                <label for="email" class="form-label">Email <span class="text-red">*</span></label>
                <input type="email" id="email" v-model="form.email" placeholder="tu@email.com" class="form-input" required>
             </div>

             <div class="form-group mb-4">
                <label for="subject" class="form-label">Asunto <span class="text-red">*</span></label>
                <input type="text" id="subject" v-model="form.subject" placeholder="¿En qué podemos ayudarte?" class="form-input" required>
             </div>

             <div class="form-group mb-6">
                <label for="message" class="form-label">Mensaje <span class="text-red">*</span></label>
                <textarea id="message" v-model="form.message" placeholder="Escribe tu mensaje aquí..." class="form-textarea" required></textarea>
             </div>

             <button type="submit" class="submit-btn" :disabled="isSubmitting">
                {{ isSubmitting ? 'ENVIANDO...' : 'ENVIAR MENSAJE' }}
             </button>
             
             <!-- Status Messages -->
             <div v-if="submitStatus === 'success'" class="status-message success-message mt-4">
                ✅ {{ statusMessage }}
             </div>
             <div v-else-if="submitStatus === 'error'" class="status-message error-message mt-4">
                ❌ {{ statusMessage }}
             </div>
             
             <p class="text-center text-grey-darken-1 mt-4 text-caption">
                 <span class="text-red">*</span> Todos los campos son obligatorios
             </p>
        </form>
      </div>
  </div>
</template>

<style scoped>
.text-red { color: #DC2626 !important; }
.text-grey-darken-1 { color: #9CA3AF !important; }

.form-container {
  background-color: rgba(17, 24, 39, 0.5);
  backdrop-filter: blur(4px);
  border: 1px solid #1F2937;
  border-radius: 16px;
  padding: 32px; /* reduced padding slightly to fit */
  transition: border-color 0.3s ease;
  height: 100%;
}

.form-container:hover {
    border-color: rgba(220, 38, 38, 0.3);
}

.form-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 600;
    color: #D1D5DB;
    margin-bottom: 8px;
}

.form-input, .form-textarea {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid #374151;
    border-radius: 8px;
    padding: 12px 16px;
    color: #FFFFFF;
    font-size: 1rem;
    transition: all 0.2s ease;
}

.form-textarea {
    height: 140px;
    resize: none;
}

.form-input:focus, .form-textarea:focus {
    border-color: #DC2626;
    outline: none;
}

.submit-btn {
    width: 100%;
    background-color: #DC2626;
    color: #FFFFFF;
    font-weight: 700;
    font-size: 1rem;
    padding: 14px 48px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 24px;
}

.contact-form-section {
    background-color: transparent;
    margin-bottom: 128px;
}

.submit-btn:hover {
    background-color: #B91C1C;
}

.submit-btn:disabled {
    background-color: #9CA3AF;
    cursor: not-allowed;
}

.status-message {
    padding: 12px 16px;
    border-radius: 8px;
    text-align: center;
    font-weight: 500;
}

.success-message {
    background-color: rgba(34, 197, 94, 0.2);
    border: 1px solid #22C55E;
    color: #22C55E;
}

.error-message {
    background-color: rgba(239, 68, 68, 0.2);
    border: 1px solid #EF4444;
    color: #EF4444;
}
</style>
