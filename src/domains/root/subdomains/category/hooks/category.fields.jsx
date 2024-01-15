import { getTranslation } from '@/utils/i18n'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export const useCategoryFeatures = (inputGroups, features) => {
  const { t, i18n } = useTranslation('listing')
  const list = useMemo(() => {
    const result = features.map((f) => ({
      categoryInputUUID: f.categoryInputUUID,
      inputGroupUUID: '',
      value: f.value,
      type: '',
      translation: {
        name: '',
        help: '',
        placeholder: '',
      },
      options: [],
      extra: [],
    }))
    inputGroups.forEach((g) => {
      g.inputs.forEach((i) => {
        const feature = result.find((f) => f.categoryInputUUID === i.uuid)
        if (feature) {
          feature.inputGroupUUID = g.uuid
          feature.type = i.type
          feature.translation = getTranslation(i.translations, i18n.language)
          feature.options = i.options
          feature.extra = i.extra
        }
      })
    })
    return result
  }, [inputGroups, features])

  const filterByGroup = useCallback(
    (groupUUID) => {
      return list.filter((f) => f.inputGroupUUID === groupUUID)
    },
    [list],
  )

  const fixValue = (value, extra) => {
    if (extra.find((e) => e.name === 'translate')?.value == '1') {
      if (Array.isArray(value)) return value.map((v) => t(`category-features.${v}`)).join(', ')
      return t(`category-features.${value}`)
    }
    return value
  }

  return { list, filterByGroup, fixValue }
}