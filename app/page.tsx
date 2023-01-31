'use client'

import {
  LoadingIndicator,
  Chat,
  ChannelList,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput
} from 'stream-chat-react'
import { useAuth } from './(context)/AuthContext'
import AuthWrapper from './AuthWrapper'

const Home = () => {
  const { user, streamChat } = useAuth()

  if (streamChat === null) return <LoadingIndicator />

  return (
    <AuthWrapper>
      <Chat client={streamChat!}>
        <ChannelList />
        <Channel>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
        </Channel>
      </Chat>
    </AuthWrapper>
  )
}

export default Home
