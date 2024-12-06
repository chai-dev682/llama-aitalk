"use client";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { chatAPI } from "@/lib/api";
import Topbar from "@/components/Topbar";
import Ask from "@/components/Ask";
import ChatSidebar from "@/components/ChatSidebar";
import AvatarDropdown from "@/components/Avatar";
import styles from './page.module.css';
import { Chat } from "@/components/ChatSidebar";

interface Message {
  content: string;
  role: 'user' | 'assistant';
}

export default function Home() {
  const { status } = useSession();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatId, setChatId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!message.trim() || isLoading) return;

    const newMessage: Message = {
      content: message,
      role: 'user'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      let response;
      if (!chatId) {
        response = await chatAPI.generate({
          query: newMessage.content
        });
        setChatId(response.data.chat_id);
      } else {
        response = await chatAPI.generate({
          query: newMessage.content,
          chat_id: chatId
        });
      }

      const aiResponse: Message = {
        content: response.data.response,
        role: 'assistant'
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChatSelect = (chatData: Chat) => {
    setMessages(Array.from({ length: chatData.msg_history.length / 2 }, (_, i) => [
      { content: chatData.msg_history[i * 2], role: 'user' as const },
      { content: chatData.msg_history[i * 2 + 1], role: 'assistant' as const }
    ]).flat());
    setChatId(chatData.id);
  };

  const handleChatDelete = (deletedChatId: number) => {
    if (deletedChatId === chatId) {
      setMessages([]);
      setChatId(null);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setChatId(null);
  };

  return (
    <>
      {status == "unauthenticated" ? (
        <div className="flex flex-col items-center justify-center h-screen p-4 md:p-8">
          <Topbar />
          <Ask />
        </div>
      ) : (
        <div className="flex h-screen relative">
          <div className="w-[20%] fixed top-0 left-0 z-50">
            <ChatSidebar 
              onChatSelect={handleChatSelect}
              onChatDelete={handleChatDelete}
              onNewChat={handleNewChat}
            />
          </div>
          <div className="w-[20%] h-full hidden md:block" />
          <div className="w-full md:w-[80%] flex flex-col h-full">
            {/* Top Bar with Avatar */}
            <div className="h-20 flex justify-end items-center px-5 md:px-10">
              <AvatarDropdown />
            </div>

            {/* Chat Container */}
            <div className={`flex-1 overflow-y-auto px-4 md:px-10 pb-4 ${styles.customScroll}`}>
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <h1 className="text-2xl md:text-3xl font-medium mb-4">Welcome to AiTalk</h1>
                  <p className="text-sm md:text-base">Start a conversation by typing a message below</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${
                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-6 py-4 ${
                          msg.role === 'user'
                            ? 'bg-[#2E3036] text-white'
                            : 'bg-[#1E1F24] text-white'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 md:p-10">
              <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Message Aitalk ai"
                    className="w-full rounded-xl px-6 py-4 pr-12 text-white placeholder-gray-500 bg-black/0 border-2 border-[#2E3036] focus:border-[#393A40] focus:ring-1 focus:ring-[#393A40] transition-colors"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit();
                      }
                    }}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="absolute aspect-square right-2 top-1/2 -translate-y-1/2 h-[75%] flex items-center rounded-lg justify-center text-gray-400 hover:text-white bg-[#393A40] disabled:opacity-50 transition-colors"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white" />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="w-5 h-5 rotate-90"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
