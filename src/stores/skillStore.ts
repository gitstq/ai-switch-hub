import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Skill } from '../types'

interface SkillState {
  skills: Skill[]
  addSkill: (skill: Skill) => void
  updateSkill: (id: string, updates: Partial<Skill>) => void
  deleteSkill: (id: string) => void
  toggleSkill: (id: string) => void
  getSkill: (id: string) => Skill | undefined
}

export const useSkillStore = create<SkillState>()(
  persist(
    (set, get) => ({
      skills: [],

      addSkill: (skill) => {
        set((state) => ({
          skills: [...state.skills, skill],
        }))
      },

      updateSkill: (id, updates) => {
        set((state) => ({
          skills: state.skills.map((s) =>
            s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s
          ),
        }))
      },

      deleteSkill: (id) => {
        set((state) => ({
          skills: state.skills.filter((s) => s.id !== id),
        }))
      },

      toggleSkill: (id) => {
        set((state) => ({
          skills: state.skills.map((s) =>
            s.id === id ? { ...s, isActive: !s.isActive } : s
          ),
        }))
      },

      getSkill: (id) => {
        return get().skills.find((s) => s.id === id)
      },
    }),
    {
      name: 'ai-switch-hub-skills',
    }
  )
)
