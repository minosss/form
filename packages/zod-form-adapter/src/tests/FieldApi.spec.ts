import { expect } from 'vitest'

import { FormApi, FieldApi } from '@tanstack/form-core'
import { zodValidator } from '../validator'
import { z } from 'zod'
import { sleep } from './utils'

describe('zod field api', () => {
  it('should run an onChange with z.string validation', () => {
    const form = new FormApi({
      defaultValues: {
        name: '',
      },
    })

    const field = new FieldApi({
      form,
      validator: zodValidator,
      name: 'name',
      onChange: z.string().min(3, 'You must have a length of at least 3'),
    })

    field.mount()

    expect(field.getMeta().errors).toEqual([])
    field.setValue('a', { touch: true })
    expect(field.getMeta().errors).toEqual([
      'You must have a length of at least 3',
    ])
    field.setValue('asdf', { touch: true })
    expect(field.getMeta().errors).toEqual([])
  })

  it('should run an onChange fn with zod validation option enabled', () => {
    const form = new FormApi({
      defaultValues: {
        name: '',
      },
    })

    const field = new FieldApi({
      form,
      validator: zodValidator,
      name: 'name',
      onChange: (val) => (val === 'a' ? 'Test' : undefined),
    })

    field.mount()

    expect(field.getMeta().errors).toEqual([])
    field.setValue('a', { touch: true })
    expect(field.getMeta().errors).toEqual(['Test'])
    field.setValue('asdf', { touch: true })
    expect(field.getMeta().errors).toEqual([])
  })

  it('should run an onChangeAsync with z.string validation', async () => {
    const form = new FormApi({
      defaultValues: {
        name: '',
      },
    })

    const field = new FieldApi({
      form,
      validator: zodValidator,
      name: 'name',
      onChangeAsync: z.string().refine(async (val) => val.length > 3, {
        message: 'Testing 123',
      }),
      onChangeAsyncDebounceMs: 0,
    })

    field.mount()

    expect(field.getMeta().errors).toEqual([])
    field.setValue('a', { touch: true })
    await sleep(10)
    expect(field.getMeta().errors).toEqual(['Testing 123'])
    field.setValue('asdf', { touch: true })
    await sleep(10)
    expect(field.getMeta().errors).toEqual([])
  })

  it('should run an onChangeAsyc fn with zod validation option enabled', async () => {
    const form = new FormApi({
      defaultValues: {
        name: '',
      },
    })

    const field = new FieldApi({
      form,
      validator: zodValidator,
      name: 'name',
      onChangeAsync: async (val) => (val === 'a' ? 'Test' : undefined),
      onChangeAsyncDebounceMs: 0,
    })

    field.mount()

    expect(field.getMeta().errors).toEqual([])
    field.setValue('a', { touch: true })
    await sleep(10)
    expect(field.getMeta().errors).toEqual(['Test'])
    field.setValue('asdf', { touch: true })
    await sleep(10)
    expect(field.getMeta().errors).toEqual([])
  })
})
