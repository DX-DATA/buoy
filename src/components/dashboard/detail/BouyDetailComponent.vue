<template>
  <div class="detail-container">
    <div class="manage-wrapper">
      <div class="top-item">
        <div>방식 :</div>
        <div v-if="!state.isModify">일반 수하식</div>
        <div v-if="state.isModify" class="select-wrapper">
          <select>
            <option>일반 수하식</option>
            <option>병렬 수하식</option>
          </select>
        </div>
      </div>
      <button class="manage-button" v-if="!state.isModify" v-on:click="init">
        구역 관리
      </button>
      <button class="modify-button" v-if="state.isModify" v-on:click="init">
        수정
      </button>
    </div>
    <div class="text">라인 1</div>
    <DetailLinear />
    <div class="text">라인 2</div>
    <DetailLinear />
    <div class="text">라인 3</div>
    <DetailLinear />
    <div class="text">라인 4</div>
    <DetailLinear />
    <div class="text">라인 5</div>
    <DetailLinear />
    <div class="text">라인 6</div>
    <DetailLinear />
    <div class="text">라인 7</div>
    <DetailLinear />
    <div class="text">라인 8</div>
    <DetailLinear />
    <div class="text">라인 9</div>
    <DetailLinear />
    <div class="text">라인 10</div>
    <DetailLinear />

    <div class="plus-line" v-if="state.isModify" v-on:click="onclickMenu">
      <img class="plus-icon" :src="require('@/assets/circle-plus.svg')" />
    </div>
  </div>

  <PlusModal v-if="state.isModal" />

  <div
    class="modal-wrapper fade-in"
    ref="modal_wrapper"
    v-on:click="closeModal"
  ></div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity';
import DetailLinear from './detailComponents/DetailLinear.vue';
import PlusModal from './detailComponents/LinearComponents/PlusModal.vue';
export default {
  components: { DetailLinear, PlusModal },
  props: { name: String },
  setup(props) {
    const modal_wrapper = ref(null);
    console.log(props.name);
    let state = reactive({
      isModify: false,
      isModal: false,
    });

    function onclickMenu() {
      state.isModal = true;
      modal_wrapper.value.style.display = 'block';
    }

    function closeModal() {
      state.isModal = false;
      modal_wrapper.value.style.display = 'none';
    }

    function init() {
      state.isModify = !state.isModify;
    }

    return { state, init, onclickMenu, closeModal, modal_wrapper };
  },
};
</script>

<style scoped>
.detail-container {
  padding: 48px 48px 48px 48px;
  display: grid;
  grid-template-columns: 0.2fr 1fr;
  row-gap: 20px;
}

.manage-wrapper {
  grid-column: 1 / 3;
  display: flex;
  justify-content: space-between;
}

.manage-button {
  width: 120px;
  height: 50px;
  border: none;
  border-radius: 5px;
  background: #6610f2;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  font-family: 'GmarketSansMedium';
  text-align: center;
  cursor: pointer;
}

.modify-button {
  width: 120px;
  height: 50px;
  border: none;
  border-radius: 5px;
  background: #198754;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  font-family: 'GmarketSansMedium';
  text-align: center;
  cursor: pointer;
}
.text {
  font-weight: bold;
  font-size: 32px;
}

.top-item {
  display: flex;
  align-items: center;

  gap: 10px;
  font-weight: bold;
  font-size: 32px;
}

.select-wrapper {
  height: 60px;
  display: flex;
  align-items: center;
}

.select-wrapper > select {
  border: 1px solid #b3b0ae;
  border-radius: 6px;
  font-size: 1rem;
  width: 150px;
  height: 40px;
}

.plus-line {
  grid-column: 1 / 3;
  border: 1px dashed gray;
  border-style: dashed;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.plus-line > img {
  width: 38px;
  cursor: pointer;
}

.modal-wrapper {
  display: none;
  z-index: 101;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  background: rgb(0, 0, 0, 0.5);
}
</style>
