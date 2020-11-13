import { getUrlParameter } from '@/app/routes/getUrlParameter'

describe(`{getUrlParameter} from '@/app/routes/getUrlParameter'`, () => {
  test('Normal case', () => {
    const r1 = getUrlParameter('?id=34&z=ababa', 'id')
    const r2 = getUrlParameter('?id=34&z=ababa', 'z')

    expect(r1).toBe('34')
    expect(r2).toBe('ababa')
  })

  test('Empty case', () => {
    const r1 = getUrlParameter('', 'id')

    expect(r1).toBe('')
  })

  test('Dirty args case', () => {
    const r1 = getUrlParameter('adfdafad?fd/a/????&d77fad7da7f7&&', 'id')

    expect(r1).toBe('')
  })
})
