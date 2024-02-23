<template>
    <q-page>
        <q-icon name="arrow_back" @click="back" size="28px" class="q-pa-md"/>
        <div class="q-pa-md">
            <h3>Generate QR Code</h3>
            <q-form @submit="genCode" class="q-gutter-md">
                <!-- <q-input hint="Company name" v-model="company"/> -->
                <q-input label="Item name *" 
                v-model="itemName"
                hint="6-pack stainless steel spoons" />
                <q-input label="Item price *" hint="9.99" v-model="itemPrice"/>
                <div class="q-mt-md q-ml-lg">
                    <q-btn label="Generate" color="secondary" type="submit"/>
                </div>
            </q-form>
        </div>

        <!-- <div v-if="generated" style="width: 150px;height: 80px;text-wrap: wrap;">
            {{ qrValue }}
        </div> -->
        <div style="margin-left: 80px;">
            <q-icon name="print" size="32px" color="secondary"/>
            <qrcode-vue 
        :value="value"
        :level="level"
        :render-as="renderAs"
        style="margin-left: 24px;outline: dashed 1px red;"
        />
        </div>
       
    </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {useRouter} from 'vue-router';

import QrcodeVue, {Level, RenderAs} from 'qrcode.vue'

const router = useRouter();

function createRandomString(length:number) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const randomArray = new Uint8Array(length);
  crypto.getRandomValues(randomArray);
  randomArray.forEach((number) => {
    result += chars[number % chars.length];
  });
  return result;
}

let value = ref('');
let valueObj = ref<{
    id: string,
    item: string,
    price: number
}[]>([]);
const arr = ref<(string|number)[]>([])
const level = ref<Level>('M');
const renderAs = ref<RenderAs>('svg');
const itemName = ref('')
const itemPrice = ref(0)


function genCode() {
    valueObj.value.push({id: createRandomString(8), item: itemName.value, price: itemPrice.value})
   value.value = JSON.stringify(valueObj.value);

    console.log('value: ', value.value);
 
    console.log('Arr: ', arr.value);
    console.log('Arr[0]: ', arr.value[0])
    console.log('Arr[1]: ', arr.value[1])
    console.log('Arr[2]: ', arr.value[2])

    arr.value = [];
    valueObj.value = [];
    itemName.value = '';
    itemPrice.value = 0;

}

function back() {
    router.back();
}

</script>