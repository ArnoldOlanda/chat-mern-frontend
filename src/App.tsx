
import { ConversationsProvider } from "./context/conversations/ConversationsContext"
import { MessagesProvider } from "./context/messages/MessagesContext"
import { RouterApp } from "./Routes/RouterApp"

function App() {

  return (
    <div>
      <ConversationsProvider>
        <MessagesProvider>
          <RouterApp />
        </MessagesProvider>
      </ConversationsProvider>
    </div>
  )
}

export default App
