<template>
  <q-page class="bg-white">
    <div class="row q-mt-xs">
      <div class="col-6 rounded-borders q-px-sm q-mt-sm">
        <q-card class="q-pa-xs bg-doing ">
          <q-item style="cursor: move;" class="q-pa-none text-white q-pa-sm rounded-borders">
            <q-item-section class="text-h6 text-weight-bolder text-color">DOING</q-item-section>
            <q-item-section avatar>
              <q-icon name="more_vert" class="cursor-pointer">
                <q-menu transition-show="fade" transition-hide="fade">
                  <q-list style="min-width: 100px">
                    <q-item clickable>
                      <q-item-section>Remove</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </q-item-section>
          </q-item>

          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            :style="{'height': getHeight}"
            class="col"
            ref="first"
          >
            <draggable
              class="list-group"
              group="tasks"
              v-bind="dragOptions"
              :list="doingTodos"
              :move="checkMove"
              @start="drag = true"
              @end="drag = false"
            >
              <q-card
                v-for="(item, index) in doingTodos"
                v-bind:key="index"
                class="rounded-borders q-my-sm"
                @mouseover="$set(todo_selected_index, 'doing', index)"
                @mouseleave="todo_selected_index.doing = null"
              >
                <q-card-section class="row q-pa-sm">
                  <div class="col-12">
                    <span class="text-weight-bold text-h6 q-ml-sm">{{ item.title }}</span>
                    <span class="float-right text-grey-8 q-mt-sm">
                      <q-icon
                        filled
                        size="xs"
                        name="close"
                        class="absolute-top-right q-mr-md q-mt-xs text-red"
                        v-if="index === todo_selected_index.doing"
                        @click="onRemove(item.id)"
                      />
                    </span>
                  </div>
                </q-card-section>
              </q-card>
            </draggable>

            <q-card class="full-width" v-if="isCreateDoing">
              <q-card-section>
                <div class="text-h6">
                  Add Task
                </div>
              </q-card-section>

              <q-card-section class="q-pa-sm">
                <q-input
                  ref="doingTitle"
                  v-model="doingTitle"
                  dense
                  label="Title"
                  outlined
                  :rules="[rules.required]"
                />
              </q-card-section>

              <q-card-actions align="right" class="q-pa-sm text-grey-8">
                <q-btn
                  label="Add"
                  color="indigo-5"
                  class="text-capitalize"
                  @click="onCreate('doing')"
                />

                <q-btn
                  label="Cancel"
                  color="primary"
                  class="text-capitalize"
                  @click="onCancelCreate('doing')"
                />
              </q-card-actions>
            </q-card>

            <q-item v-else>
              <q-btn icon="add" rounded flat label="Add Task" @click="isCreateDoing = true"/>
            </q-item>
          </q-scroll-area>

        </q-card>
      </div>

      <div class="col-6 q-px-sm q-mt-sm">
        <q-card class="q-pa-xs bg-done ">
          <q-item style="cursor: move;" class="q-pa-none text-white q-pa-sm">
            <q-item-section class="text-h6 text-weight-bolder text-color">COMPLETED</q-item-section>

            <q-item-section avatar>
              <q-icon name="more_vert" class="cursor-pointer">
                <q-menu transition-show="fade" transition-hide="fade">
                  <q-list style="min-width: 100px">
                    <q-item clickable>
                      <q-item-section>Remove</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-icon>
            </q-item-section>
          </q-item>

          <q-scroll-area
            :thumb-style="thumbStyle"
            :bar-style="barStyle"
            :style="{'height': getHeight}"
            class="col"
            ref="first"
          >
            <draggable
              class="list-group"
              group="tasks"
              v-bind="dragOptions"
              :list="completedTodos"
              :move="checkMove"
              @start="drag = true"
              @end="drag = false"
            >
              <q-card
                v-for="(item, index) in completedTodos"
                v-bind:key="index"
                class="rounded-borders q-my-sm"
                @mouseover="todo_selected_index.completed = index"
                @mouseleave="todo_selected_index.completed = null"
              >
                <q-card-section class="row q-pa-sm">
                  <div class="col-12">
                    <span class="text-weight-bold text-h6 q-ml-sm">{{item.title}}</span>

                    <span class="float-right text-grey-8 q-mt-sm">
                      <q-icon
                        filled
                        size="xs"
                        name="close"
                        class="absolute-top-right q-mr-md q-mt-xs text-red"
                        v-if="index === todo_selected_index.completed"
                        @click="onRemove(item.id)"
                      />
                    </span>
                  </div>
                </q-card-section>
              </q-card>
            </draggable>

            <q-card class="full-width" v-if="isCreateCompleted">
              <q-card-section>
                <div class="text-h6">
                  Add Task
                </div>
              </q-card-section>

              <q-card-section class="q-pa-sm">
                <q-input
                  ref="completedTitle"
                  v-model="completedTitle"
                  dense
                  label="Title"
                  outlined
                  :rules="[val => !!val || 'Field is required']"
                />
              </q-card-section>

              <q-card-actions align="right" class="q-pa-sm text-grey-8">
                <q-btn
                  label="Add"
                  color="indigo-5"
                  class="text-capitalize"
                  @click="onCreate('completed')"
                />

                <q-btn
                  label="Cancel"
                  color="primary"
                  class="text-capitalize"
                  @click="onCancelCreate('completed')" />
              </q-card-actions>
            </q-card>

            <q-item v-else>
              <q-btn icon="add" rounded flat label="Add Task" @click="isCreateCompleted = true"/>
            </q-item>
          </q-scroll-area>
        </q-card>
      </div>

    </div>
    <q-resize-observer @resize="onResize"/>
  </q-page>
</template>

<script>
import draggable from 'vuedraggable'
import { mapState, mapActions, mapGetters } from 'vuex'
import showNotify from 'src/utils/notification'

export default {
  name: 'Todos',
  components: {
    draggable
  },

  data () {
    return {
      doingTitle: '',
      completedTitle: '',
      isCreateDoing: false,
      isCreateCompleted: false,
      size: {},
      todo_selected_index: {
        doing: null,
        completed: null
      },
      thumbStyle: {
        right: '4px',
        borderRadius: '5px',
        backgroundColor: '#027be3',
        width: '5px',
        opacity: 0.75
      },
      barStyle: {
        right: '2px',
        borderRadius: '9px',
        backgroundColor: '#027be3',
        width: '9px',
        opacity: 0.2
      },
      rules: {
        required: val => !!val || 'Field is required'
      }
    }
  },

  async mounted () {
    try {
      await this.getAllTodos()
    } catch (e) {
      showNotify('negative', 'Something went wrong')
      console.error(e)
    }
  },

  computed: {
    ...mapState('todo', ['todos']),

    ...mapGetters({
      doingTodos: 'todo/doingTodos',
      completedTodos: 'todo/completedTodos'
    }),

    dragOptions () {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      }
    },

    getHeight () {
      return this.size.height - 90 + 'px'
    }
  },

  methods: {
    ...mapActions({
      getAllTodos: 'todo/getAllTodos',
      createTodo: 'todo/createTodo',
      removeTodo: 'todo/removeTodo',
      editTodo: 'todo/editTodo'
    }),

    async onCreate (type) {
      let title = this.doingTitle
      let completed = false

      if (type === 'completed') {
        title = this.completedTitle
        completed = true
      }

      try {
        this.$q.loading.show()
        await this.createTodo({ title, completed })
        showNotify('positive', 'Create successful')
      } catch (e) {
        showNotify('negative', 'Something went wrong')
        console.error(e)
      } finally {
        if (type === 'doing') {
          this.doingTitle = ''
          this.isCreateDoing = false
        } else {
          this.completedTitle = ''
          this.isCreateCompleted = false
        }

        this.$q.loading.hide()
      }
    },

    onCancelCreate (type) {
      if (type === 'doing') {
        this.isCreateDoing = false
        this.doingTitle = ''
        this.$refs.doingTitle.resetValidation()
      } else {
        this.isCreateCompleted = false
        this.completedTitle = ''
        this.$refs.completedTitle.resetValidation()
      }
    },

    onRemove (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Would you like to remove the todo?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        await this.handleRemove(id)
      })
        .onCancel(() => {})
        .onDismiss(() => {})
    },

    async handleRemove (id) {
      try {
        this.$q.loading.show()
        await this.removeTodo(id)
        showNotify('positive', 'Remove successful')
      } catch (e) {
        showNotify('negative', 'Something went wrong')
        console.error(e)
      } finally {
        this.$q.loading.hide()
      }
    },

    onResize (size) {
      this.size = size
    },

    async checkMove (evt) {
      const todo = evt.draggedContext.element
      const updatedTodo = Object.assign({}, todo)
      updatedTodo.completed = !updatedTodo.completed

      try {
        this.$q.loading.show()
        await this.editTodo(updatedTodo)
        showNotify('positive', 'Edit successful')
        return true
      } catch (e) {
        showNotify('negative', 'Something went wrong')
        console.error(e)
        return false
      } finally {
        this.$q.loading.hide()
      }
    }
  }
}
</script>

<style scoped>
  .bg-doing {
    background-image: linear-gradient(to bottom, #a18cd1 0%, #fbc2eb 100%);
  }
  .bg-done {
    background-image: linear-gradient(to bottom , #4facfe 0%, #00f2fe 100%);
  }
  .text-color {
    color: white
  }
</style>
