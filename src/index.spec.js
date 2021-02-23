import { property } from '@dword-design/functions'
import tester from '@dword-design/tester'
import axios from 'axios'
import { mkdir, remove } from 'fs-extra'

import self from '.'

export default tester(
  {
    works: async () => {
      const result =
        axios.get('http://localhost:3000') |> await |> property('data')
      expect(result).toMatch(
        'Please create <a href="https://nuxtjs.org/guide/directory-structure#the-pages-directory" target="_blank">the pages directory</a> to suppress this default page.'
      )
    },
  },
  [
    {
      after: async () => {
        process.chdir('..')
        await remove('testdir')
      },
      before: async () => {
        await mkdir('testdir')
        process.chdir('testdir')
      },
    },
    self(),
  ]
)
