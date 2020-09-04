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
              @click="prompt = true"
            >
              <q-tooltip content-class="bg-accent">Add post</q-tooltip>
            </q-btn>

            <q-dialog v-model="prompt" persistent>
              <q-card style="min-width: 350px">
                <q-card-section>
                  <div class="text-h6">New post</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <q-input style="margin-bottom: 20px" dense v-model="newPost.title" label="Title" autofocus />
                  <q-input style="margin-bottom: 20px" dense v-model="newPost.body" label="Body" />
                  <q-input dense v-model="newPost.userId" label="Created by" />
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                  <q-btn flat label="Cancel" v-close-popup />
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
            v-for="post in postsPagination"
            :key="post.id"
          >
            <q-card style="background-color: #292845" class="text-white">
              <q-separator/>

              <q-card-section>
                <div class="row items-center no-wrap">
                  <div class="col">
                    <div class="text-h5">{{ post.title }}</div>
                  </div>

                  <div class="col-auto float-right">
                    <q-btn color="grey-7" round flat icon="more_vert">
                      <q-menu cover auto-close>
                        <q-list>
                          <q-item clickable>
                            <q-item-section>Edit Card</q-item-section>
                          </q-item>
                          <q-item clickable>
                            <q-item-section @click="onRemove(post.id)">Remove Card</q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </div>
                </div>
              </q-card-section>

              <q-card-section class="text-justify">
                <div>{{ post.body }}</div>
              </q-card-section>
            </q-card>
          </div>
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
      expandIndex: null,
      rowPerPage: 10,
      postName: '',
      prompt: false,
      newPost: {
        title: '',
        body: '',
        userId: null
      }
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
      removePost: 'post/removePost'
    }),

    async onCreate () {
      this.$q.loading.show()
      try {
        await this.createPost(this.newPost)
        await this.getAllPosts()
        showNotify('positive', 'Create successful')
      } catch (e) {
        showNotify('negative', 'Something went wrong')
      } finally {
        this.resetNewPost()
        this.$q.loading.hide()
      }
    },

    async onRemove (id) {
      this.$q.loading.show()
      try {
        await this.removePost(id)
        await this.getAllPosts()
        showNotify('positive', 'Remove successful')
      } catch (e) {
        showNotify('negative', 'Something went wrong')
      } finally {
        this.$q.loading.hide()
      }
    },

    resetNewPost () {
      this.newPost.title = ''
      this.newPost.body = ''
      this.newPost.userId = null
    }
  },

  async mounted () {
    try {
      await this.getAllPosts()
    } catch (e) {
      showNotify('negative', 'Something went wrong')
    }
  }
}
</script>
