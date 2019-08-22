import * as R from 'ramda'

const iff = (pred, trueFun, falseFun) => {
  return !!pred ? trueFun(pred) : (falseFun || (()=>null))()
}

const appParams = (acc, x) => {
  const { ps: [pr, ...rest], r } = acc
  const res =
    iff(pr && pr.match(/-([^0-9-]{1}$)/i),
      ([_, name]) => {
        const vals = r[name]
        return {
          ...r,
          [name]: !vals ? [x] : [...vals, x]
        }
      },
      () =>
        iff(pr && pr.match(/^--(.+)/i),
          ([_, name]) => ({ ...r, [name]: x }),
          R.always(r)
        )
    )
  return {
    ps: [x, pr, ...rest],
    r: res
  }
}

export const parseArgs = argv => argv.reduce(appParams, { ps: [], r: {}, curr: null }).r
