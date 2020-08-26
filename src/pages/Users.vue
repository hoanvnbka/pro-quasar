<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :data="users"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Users',
  data () {
    return {
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'name',
          sortable: true
        },
        {
          name: 'user_name',
          required: true,
          label: 'User Name',
          align: 'left',
          field: 'user_name',
          sortable: true
        },
        { name: 'email', required: true, align: 'left', label: 'Email', field: 'email', sortable: true }
      ]
    }
  },
  computed: {
    ...mapGetters({
      users: 'user/allUsers'
    })
  }
}
</script>

<style scoped>

</style>
