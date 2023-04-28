import React, {
    useReducer,
    useCallback,
    createContext,
    useContext,
  } from "react";
import { TxStatus } from "~/utils/blockchain/status";

type NotificationsState = {
    notifications: NotificationState[];
  };

type NotificationState = {
    txHash: string;
    project: string;
    source: string;
    status: TxStatus
};
  
  enum NotificationStateActions {
    AddNotification = "ADD_NOTIFICATION",
    RemoveNotification = "REMOVE_NOTIFICATION",
  }
  
  const INITIAL_STATE: NotificationsState = {
    notifications: []
  };
  
  interface AddNotification {
    type: NotificationStateActions.AddNotification;
    txHash: string;
    project: string;
    source: string;
    status: TxStatus
  }
  
  
  type NotificationActions = AddNotification;
  
  function notificationsStateReducer(
    state: NotificationState,
    action: NotificationActions
  ) {
    switch (action.type) {
      case NotificationStateActions.AddNotification:
        return {
          ...state,

        };
      default:
        return state;
    }
  }
  
  export function useApplicationState() {
    const { state, dispatch } = useContext(ApplicationStateContext);

  
    const addNotification = useCallback(
      (
        
      ) => {
        dispatch({
            
        });
      },
      []
    );
  
    return { state, addNotification };
  }
  
export const ApplicationStateContext = createContext<{
    state: NotificationState;
    dispatch: () => void;
}>(INITIAL_STATE);
  
export function NotificationsStateProvider({
    children,
  }: React.PropsWithChildren) {
    const [state, dispatch] = useReducer(notificationsStateReducer, INITIAL_STATE);
  
    const value = { state, dispatch };
    return (
      <NotificationsStateProvider.Provider value={value}>
        {children}
      </NotificationsStateProvider.Provider>
    );
  }