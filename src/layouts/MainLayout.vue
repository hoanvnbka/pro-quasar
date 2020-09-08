<template>
  <q-layout view="hHh LpR fff">

    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="drawer = !drawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Title
        </q-toolbar-title>

        <q-btn
          class="q-mr-xs"
          flat
          round
          :icon="$q.dark.isActive ? 'wb_sunny' : 'fas fa-moon'"
          @click="$q.dark.toggle()"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="drawer"
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      :width="200"
      :breakpoint="500"
      bordered
      content-class="bg-gray-3"
    >
      <q-scroll-area class="fit">
      <q-list padding>
        <q-item to="/users" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="fas fa-users" />
          </q-item-section>

          <q-item-section>
            Users
          </q-item-section>
        </q-item>

        <q-item to="/posts" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="far fa-clone" />
          </q-item-section>

          <q-item-section>
            Posts
          </q-item-section>
        </q-item>

        <q-item to="/todos" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="fas fa-tasks" />
          </q-item-section>

          <q-item-section>
            Tasks
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      miniState: true
    }
  }
}
</script>
