import { User } from './registration.service'

export interface CheckIn {
    user: User,
    created_at: Date
}