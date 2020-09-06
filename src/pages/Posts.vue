<template>
  <q-page>
    <q-card class="bg-transparent no-shadow no-border">
      <q-card-section class="row">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div class="text-h6 float-left q-ml-md q-mt-sm">Pagination With Filters</div>

          <q-space/>

          <div class="row float-right q-gutter-md">
            <q-btn
              rounded
              color="secondary"
              icon="add_circle_outline"
              size="md"
              @click="isCreate = true"
            >
              <q-tooltip content-class="bg-accent">Add post</q-tooltip>
            </q-btn>

            <q-dialog v-model="isCreate" persistent>
              <q-card style="min-width: 350px">
                <q-card-section>
                  <div class="text-h6">New post</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <q-input style="margin-bottom: 20px" dense v-model="post.title" label="Title" autofocus />
                  <q-input style="margin-bottom: 20px" dense v-model="post.body" label="Body" />
                  <q-input dense v-model="post.userId" label="Created by" />
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                  <q-btn flat label="Cancel" @click="resetPost()" v-close-popup />
                  <q-btn flat label="Create post" @click="onCreate()" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>

            <q-input
              v-model="postName"
              rounded
              outlined
              label="Search"
            >
              <template v-slot:prepend>
                <q-icon name="search"/>
              </template>

              <template v-slot:append>
                <q-icon
                  name="close"
                  class="cursor-pointer"
                  @click="postName = ''"
                />
              </template>
            </q-input>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-mx-sm">
        <div class="row q-col-gutter-lg">
          <div
            class="col-lg-3 col-sm-12 col-xs-12 col-md-3"
            v-for="elm in postsPagination"
            :key="elm.id"
          >
            <q-card style="background-color: #292845" class="text-white">
              <q-separator/>

              <q-card-section>
                <div class="row items-center no-wrap">
                  <div class="col">
                    <div class="text-h5">{{ elm.title }}</div>
                  </div>

                  <div class="col-auto float-right">
                    <q-btn color="grey-7" round flat icon="more_vert">
                      <q-menu cover auto-close>
                        <q-list>
                          <q-item clickable>
                            <q-item-section @click="onEdit(elm.id)">Edit Post</q-item-section>
                          </q-item>

                          <q-item clickable>
                            <q-item-section @click="onRemove(elm.id)">Remove Post</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </div>
                </div>
              </q-card-section>

              <q-card-section class="text-justify">
                <div>{{ elm.body }}</div>
              </q-card-section>
            </q-card>
          </div>

          <q-dialog v-model="isEdit" persistent>
            <q-card style="min-width: 350px">
              <q-card-section>
                <div class="text-h6">Edit Post</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-input style="margin-bottom: 20px" dense v-model="post.title" label="Title" autofocus />
                <q-input style="margin-bottom: 20px" dense v-model="post.body" label="Body" />
                <q-input dense v-model="post.userId" label="Created by" />
              </q-card-section>

              <q-card-actions align="right" class="text-primary">
                <q-btn flat label="Cancel" @click="$router.replace('/posts')" v-close-popup />
                <q-btn flat label="Edit post" @click="handleEdit()" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>

        </div>
      </q-card-section>

      <q-card-actions align="center">
        <q-pagination
          v-model="currentPage"
          color="teal"
          :max="Math.ceil(posts.length / rowPerPage)"
          :max-pages="6"
          :boundary-numbers="false"
        >
        </q-pagination>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import showNotify from 'src/utils/notification'

export default {
  name: 'Posts',
  data () {
    return {
      currentPage: 1,
      rowPerPage: 12,
      postName: '',
      isCreate: false,
      isEdit: false,
      post: {
        title: '',
        body: '',
        userId: null
      }
    }
  },

  async mounted () {
    try {
      await this.getAllPosts()
    } catch (e) {
      showNotify('negative', 'Something went wrong')
    }
  },

  computed: {
    ...mapGetters({
      posts: 'post/allPosts'
    }),

    postsPagination () {
      return this.postsFilters.slice(
        (this.currentPage - 1) * this.rowPerPage,
        (this.currentPage - 1) * this.rowPerPage + this.rowPerPage
      )
    },

    postsFilters () {
      if (this.postName === '') {
        return this.posts
      }

      const self = this
      return this.posts.filter(function (post) {
        return post.title.includes(self.postName)
      })
    }
  },

  methods: {
    ...mapActions({
      createPost: 'post/createPost',
      getAllPosts: 'post/getAllPosts',
      editPost: 'post/editPost',
      removePost: 'post/removePost'
    }),

    async onCreate () {
      this.$q.loading.show()
      try {
        await this.createPost(this.post)
        showNotify('positive', 'Create successful')
      } catch (e) {
        showNotify('negative', 'Something went wrong')
      } finally {
        this.resetPost()
        this.$q.loading.hide()
      }
    },

    onEdit (id) {
      this.isEdit = true
      const post = this.postsPagination.find(elm => elm.id === id)
      Object.assign(this.post, post)
      this.$router.replace({ query: { id } })
    },

    async handleEdit () {
      this.$q.loading.show()
      try {
        await this.editPost(this.post)
        showNotify('positive', 'Edit successful')
      } catch (e) {
        showNotify('negative', 'Something went wrong')
      } finally {
        await this.$router.replace('/posts')
        this.resetPost()
        this.$q.loading.hide()
      }
    },

    onRemove (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Would you like to remove the post?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        await this.handleRemove(id)
      })
        .onCancel(() => {})
        .onDismiss(() => {})
    },

    async handleRemove (id) {
      this.$q.loading.show()
      try {
        await this.removePost(id)
        showNotify('positive', 'Remove successful')
      } catch (e) {
        showNotify('negative', 'Something went wrong')
      } finally {
        this.$q.loading.hide()
      }
    },

    resetPost () {
      this.post.title = ''
      this.post.body = ''
      this.post.userId = null
    }
  }
}
</script>
