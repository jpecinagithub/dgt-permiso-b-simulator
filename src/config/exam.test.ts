import { describe, expect, it } from 'vitest'
import { EXAM_CONFIG, isPassed } from './exam'

describe('EXAM_CONFIG', () => {
  it('define el formato oficial del examen teórico del permiso B', () => {
    expect(EXAM_CONFIG.questionCount).toBe(30)
    expect(EXAM_CONFIG.optionsPerQuestion).toBe(3)
    expect(EXAM_CONFIG.timeLimitMinutes).toBe(30)
    expect(EXAM_CONFIG.maxErrors).toBe(3)
    expect(EXAM_CONFIG.passRate).toBe(0.9)
  })

  it('declara que las preguntas en blanco cuentan como error (decisión del simulador)', () => {
    expect(EXAM_CONFIG.blankCountsAsError).toBe(true)
  })

  it('tiene las preguntas con vídeo desactivadas (la DGT no las usa en 2026)', () => {
    expect(EXAM_CONFIG.videoQuestions.enabled).toBe(false)
  })
})

describe('isPassed', () => {
  it('APTO con 0–3 errores', () => {
    expect(isPassed(0)).toBe(true)
    expect(isPassed(3)).toBe(true)
  })

  it('NO APTO con 4 o más errores', () => {
    expect(isPassed(4)).toBe(false)
    expect(isPassed(30)).toBe(false)
  })
})
