'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from 'lucide-react';
import { getChatGPTResponse } from '@/actions/prompt';

type Message = {
  role: "user" | "assistant";
  content: string;
};

// Define the speed of streaming (milliseconds per character)
const STREAMING_SPEED_MS = 0; // Adjust for faster/slower streaming

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // State for managing the streaming effect
  const [streamingMessageContent, setStreamingMessageContent] = useState<string | null>(null);
  const [streamingMessageIndex, setStreamingMessageIndex] = useState<number | null>(null);
  const streamIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  // Effect to scroll down when messages change or during streaming
  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  // Effect to handle the character-by-character streaming
  useEffect(() => {
    // Clear any existing interval if dependencies change
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = null;
    }

    if (streamingMessageIndex !== null && streamingMessageContent) {
      let charIndex = 0;
      streamIntervalRef.current = setInterval(() => {
        if (charIndex < streamingMessageContent.length) {
          setMessages(prevMessages => {
            // Ensure the index is valid
            if (streamingMessageIndex >= prevMessages.length || streamingMessageIndex < 0) {
              console.error("Streaming index out of bounds");
              clearInterval(streamIntervalRef.current!);
              setStreamingMessageIndex(null);
              setStreamingMessageContent(null);
              return prevMessages;
            }

            const updatedMessages = [...prevMessages];
            // Append next character
            updatedMessages[streamingMessageIndex] = {
              ...updatedMessages[streamingMessageIndex],
              content: streamingMessageContent.substring(0, charIndex + 1),
            };
            return updatedMessages;
          });
          charIndex++;
        } else {
          // Streaming finished
          clearInterval(streamIntervalRef.current!);
          streamIntervalRef.current = null;
          setStreamingMessageIndex(null);
          setStreamingMessageContent(null);
          setIsLoading(false); // Ensure loading is false *after* streaming completes
        }
      }, STREAMING_SPEED_MS);
    }

    // Cleanup function to clear interval on component unmount or before re-running effect
    return () => {
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
      }
    };
  }, [streamingMessageIndex, streamingMessageContent]); // Rerun effect if these change


  const handleSendMessage = async () => {
    const trimmedInput = inputValue.trim();
    if (trimmedInput === "" || isLoading || streamingMessageIndex !== null) return; // Prevent sending while loading/streaming

    const userMessage: Message = {
      role: "user",
      content: trimmedInput,
    };

    // Add user message and an empty placeholder for the assistant response
    const assistantPlaceholder: Message = { role: "assistant", content: "" };
    setMessages(prev => [...prev, userMessage, assistantPlaceholder]);
    const newAssistantMessageIndex = messages.length + 1; // Index where the placeholder will be

    setInputValue("");
    setIsLoading(true); // Set loading true, will be set false when streaming ends

    // Call the server action
    const response = await getChatGPTResponse(trimmedInput);
    // Note: setIsLoading(false) is moved to the streaming effect's completion logic

    if (response.success && response.message) {
      // Start streaming the response into the placeholder
      setStreamingMessageContent(response.message);
      setStreamingMessageIndex(newAssistantMessageIndex);
    } else {
      // Handle error - display an error message in the placeholder spot
      console.error("Failed to get AI response:", response.error);
      const errorMessageContent = `Sorry, I encountered an error: ${response.error || 'Unknown error'}`;
      setMessages(prev => {
        const updated = [...prev];
        // Update the placeholder with the error message directly
        if (newAssistantMessageIndex < updated.length) {
          updated[newAssistantMessageIndex] = {
            ...updated[newAssistantMessageIndex],
            content: errorMessageContent
          };
        } else {
          // Fallback if index somehow got out of sync (shouldn't happen)
          updated.push({ role: 'assistant', content: errorMessageContent });
        }
        return updated;
      });
      setIsLoading(false); // Stop loading on error
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground max-w-[1440px] mx-auto">
      {/* Message Display Area */}
      <div className="flex-grow overflow-y-auto p-4 md:p-6">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">
              Start chatting with Minerva!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-lg shadow-sm ${msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                    } ${
                    // Add blinking cursor effect to the message being streamed
                    index === streamingMessageIndex ? 'after:content-["▋"] after:ml-1 after:animate-pulse' : ''
                    }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {/* Invisible element to scroll to */}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 border-t bg-background sticky bottom-0">
        <div className="flex items-center max-w-3xl mx-auto bg-muted rounded-lg p-2">
          <Input
            type="text"
            placeholder="Send a message..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="flex-grow bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 mr-2"
            disabled={isLoading || streamingMessageIndex !== null} // Disable input while loading/streaming
          />
          <Button onClick={handleSendMessage} size="icon" variant="ghost" disabled={isLoading || streamingMessageIndex !== null || inputValue.trim() === ""}>
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}