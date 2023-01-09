<template>
  <div :class="tabwrap">
    <TabGroup>
      <TabList :class="tablist">
        <Tab
          v-for="category in Object.keys(categories)"
          as="template"
          :key="category"
          v-slot="{ selected }">
          <button :class="[ tabbuttoncolor, tabbuttonring, tabbuttonselected(selected)]">
            {{ category }}
          </button>
        </Tab>
      </TabList>

      <TabPanels class="mt-2">
        <TabPanel
          v-for="(posts, idx) in Object.values(categories)"
          :key="idx" :class="[ tabpanelcolor, tabpanelring ]">
          <ul>
            <li v-for="post in posts" :key="post.id" :class="tabpanelli">
              <h3 :class="tabpanelh3">
                {{ post.title }}
              </h3>

              <ul :class="tabpanelinnerul">
                <li>{{ post.date }}</li>
                <li>&middot;</li>
                <li>{{ post.commentCount }} comments</li>
                <li>&middot;</li>
                <li>{{ post.shareCount }} shares</li>
              </ul>

              <a href="#" :class="[ tabpanelacolor, tabpanelaring ]"></a>
            </li>
          </ul>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

const {
  tabwrap,
  tablist,
  tabbuttoncolor,
  tabbuttonring,
  tabbuttonselected,
  tabpanelcolor,
  tabpanelring,
  tabpanelli,
  tabpanelh3,
  tabpanelinnerul,
  tabpanelacolor,
  tabpanelaring
} = useUi()

const categories = ref({
  Bio: [
    {
      id: 1,
      title: 'Does drinking coffee make you smarter?',
      date: '5h ago',
      commentCount: 5,
      shareCount: 2,
    },
    {
      id: 2,
      title: "So you've bought coffee... now what?",
      date: '2h ago',
      commentCount: 3,
      shareCount: 2,
    },
  ],
  Occupation: [
    {
      id: 1,
      title: 'Is tech making coffee better or worse?',
      date: 'Jan 7',
      commentCount: 29,
      shareCount: 16,
    },
    {
      id: 2,
      title: 'The most innovative things happening in coffee',
      date: 'Mar 19',
      commentCount: 24,
      shareCount: 12,
    },
  ],
  Status: [
    {
      id: 1,
      title: 'Ask Me Anything: 10 answers to your questions about coffee',
      date: '2d ago',
      commentCount: 9,
      shareCount: 5,
    },
    {
      id: 2,
      title: "The worst advice we've ever heard about coffee",
      date: '4d ago',
      commentCount: 1,
      shareCount: 2,
    },
  ],
})
</script>
