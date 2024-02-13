<template>
    <q-page>
        <q-icon name="arrow_back" @click="back" size="28px" class="q-pa-md"/>
        <div class="q-pa-md">
            <h3>Generate QR Code</h3>
            <q-form @submit="genCode" class="q-gutter-md">
                <q-input hint="Company name" v-model="company"/>
                <q-input label="Item name *" 
                v-model="name"
                hint="6-pack stainless steel spoons" />
                <q-input label="Item price *" hint="9.99" type="number" v-model="price"/>
                <div class="q-mt-md q-ml-lg">
                    <q-btn label="Generate" color="secondary" type="submit"/>
                </div>
            </q-form>
        </div>

        <div v-if="generated" style="width: 150px;height: 80px;text-wrap: wrap;">
            {{ qrValue }}
        </div>
       
    </q-page>
</template>

<script setup>
import { ref } from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();

const qrValue = ref('');
const company = ref('');
const name = ref('')
const price = ref(0)
const generated = ref(false);



function genCode() {
    console.log(`${company.value}: ${name.value} - ${price.value}`);
    qrValue.value += `${company.value}: ${name.value} - ${price.value}`;

    generated.value = true;
    console.log('QRCode: ', qrValue.value)
    console.log('Type: ', typeof qrValue.value)
    company.value = '';
    name.value = '';
    price.value = 0;

}

function back() {
    router.back();
}

</script>