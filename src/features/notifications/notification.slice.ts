import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface NotificationState {
    type: 'success' | 'error' | null;
    message: string | null;
    description?: string | null;
}

const initialState: NotificationState = {
    type: null,
    message: null,
    description: null
}

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        showNotification(state, notification: PayloadAction<NotificationState>) {
            state.type = notification.payload.type;
            state.message = notification.payload.message;
            state.description = notification.payload.description;
        }
    }
})

export const {showNotification} = notificationSlice.actions
export default notificationSlice.reducer