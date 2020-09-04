<template>
  <div class="q-pa-md">
    <q-table
      title="Users"
      :data="users"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import showNotify from 'src/utils/notification'

export default {
  name: 'Users',
  data () {
    return {
      columns: [
        {
          name: 'id',
          required: true,
          label: 'Id',
          align: 'center',
          field: 'id',
          sortable: true
        },
        {
          name: 'name',
          required: true,
          label: 'Name',
          align: 'left',
          field: 'name',
          sortable: true
        },
        {
          name: 'username',
          required: true,
          label: 'User Name',
          align: 'left',
          field: 'username',
          sortable: true
        },
        { name: 'email', required: true, align: 'left', label: 'Email', field: 'email', sortable: true },
        {
          name: 'phone',
          required: true,
          label: 'Phone',
          align: 'left',
          field: 'phone',
          sortable: true
        },
        {
          name: 'website',
          required: true,
          label: 'Website',
          align: 'left',
          field: 'website',
          sortable: true
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      users: 'user/allUsers'
    })
  },
  methods: {
    ...mapActions({
      getAllUsers: 'user/getAllUsers'
    })
  },
  async mounted () {
    try {
      await this.getAllUsers()
    } catch (e) {
      showNotify('negative', 'Something went wrong')
    }
  }
}
</script>

<style scoped>

</style>
