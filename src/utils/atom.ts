import { atom } from 'jotai'
import { ChessProfile, ChessStats } from './types'

export const usernameAtom = atom<string>('')

export const statsAtom = atom<ChessStats>()

export const profileAtom = atom<ChessProfile>()

export const yearAtom = atom<string>('')

export const monthAtom = atom<string>('')

export const archivesAtom = atom<any[]>([])

export const gamesAtom = atom<any[]>([])
