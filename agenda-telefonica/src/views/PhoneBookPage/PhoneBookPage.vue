<template>
  <div>
    <ui-grid>
      <ui-grid-cell>
        <ui-button icon="add" @click="addNew">Add new Contact</ui-button>
      </ui-grid-cell>
    </ui-grid>

    <ui-grid>
      <ui-grid-cell columns="12">
        <ui-table
          v-model="selectedRows"
          fullwidth
          :data="state.data"
          :thead="state.thead"
          :tbody="state.tbody"
          selected-key="id"
        >
          <template #th-dessert>
            Dessert
            <ui-icon v-tooltip="'100g serving'" aria-describedby="th-cell-1">
              error_outline
            </ui-icon>
          </template>

          <template #firstname="{ data }">
            <div v-if="data.isAdding">
              <ui-textfield
                @keypress="onlyLetters($event)"
                required
                minlength="3"
                v-model="data.firstname"
              >
                First name
              </ui-textfield>
            </div>
            <div v-else>
              <div class="name">{{ data.firstname }}</div>
            </div>
          </template>

          <template #lastname="{ data }">
            <div v-if="data.isAdding">
              <ui-textfield
                @keypress="onlyLetters($event)"
                required
                minlength="3"
                v-model="data.lastname"
              >
                Last name
              </ui-textfield>
            </div>
            <div v-else>
              <div class="lastname">{{ data.lastname }}</div>
            </div>
          </template>

          <template #number="{ data }">
            <div v-if="data.isAdding">
              <ui-textfield
                :required="true"
                v-model="data.number"
                v-maska="'(##) ####-####'"
              >
                (XX) XXXXX-XXXX
              </ui-textfield>
            </div>
            <div v-else>
              <div class="number">{{ data.number }}</div>
            </div>
          </template>

          <template #actions="{ data }">
            <div v-if="data.isAdding">
              <ui-icon @click="saveContact(data)">check</ui-icon>
            </div>
            <div v-else>
              <ui-icon @click="editContact(data)">edit</ui-icon>
              <ui-icon @click="deleteContact(data)">delete</ui-icon>
            </div>

          </template>
        </ui-table>
      </ui-grid-cell>
    </ui-grid>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  setup() {
    const state = reactive({
      isAdding: false,
      data: [{ id: 0, name: "", isAdding: true }],
      thead: [
        {
          value: "ID",
          columnId: "id",
        },
        {
          value: "FirstName",
          columnId: "firstname",
        },
        {
          value: "LastName",
          columnId: "lastname",
        },
        {
          value: "Number",
          columnId: "number",
        },
        "Actions",
      ],
      tbody: [
        "id",
        {
          slot: "firstname",
        },
         {
          slot: "lastname",
        },
        {
          slot: "number",
        },
        {
          slot: "actions",
        },
      ],
    });

    function editContact(contact) {
      const contactKey = state.data.findIndex(
        (value) => value.id === contact.id
      );
      state.data[contactKey].isAdding = true;
    }

    function deleteContact(contact) {
      const contactKey = state.data.findIndex(
        (value) => value.id === contact.id
      );
      state.data.splice(contactKey, 1);
    }

    function addNew() {
      const lastItem = state.data[state.data.length - 1];
      state.data.push({
        id: lastItem.id + 1,
        isAdding: true,
      });
    }

    function saveContact(contact) {
      const contactKey = state.data.findIndex(
        (value) => value.id === contact.id
      );
      console.log("save ", contactKey, contact, state.data);
      state.data[contactKey] = {
        ...state.data[contactKey],
        ...contact,
        isAdding: false,
      };
      console.log("save 2", state.data);
    }

    function onlyLetters($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if ((keyCode > 48 || keyCode > 57) && keyCode !== 46) {
        //$event.preventDefault();
      }
    }

    return {
      state,
      addNew,
      saveContact,
      editContact,
      deleteContact,
      onlyLetters,
    };
  },
};
</script>

<style>
i {
  cursor: pointer;
}
</style>
