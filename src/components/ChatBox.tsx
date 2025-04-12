import React, { useState } from "react";
import { getChatGPTResponse } from "@/actions/prompt";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Message = {
  role: "user" | "assistant"; // Define roles for user and AI/assistant
  content: string;
  time: Date;
};

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = async () => { // Make the handler async
    if (inputValue.trim() === "") return;

    const userMessage: Message = {
      role: "user",
      content: inputValue,
      time: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue; // Store input before clearing
    setInputValue("");

    // Call the server action
    const response = await getChatGPTResponse(currentInput);

    if (response.success && response.message) {
      const assistantMessage: Message = {
        role: "assistant",
        content: response.message,
        time: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } else {
      // Handle error - maybe display an error message to the user
      console.error("Failed to get AI response:", response.error);
      const errorMessage: Message = {
        role: "assistant",
        content: `Sorry, I encountered an error: ${response.error || 'Unknown error'}`,
        time: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[500px] w-full max-w-md mx-auto border rounded-lg shadow-md bg-card text-card-foreground">
      {/* Message Display Area - Use a div with overflow */}
      <div className="flex-grow p-4 space-y-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] p-2 rounded-lg ${msg.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
                }`}
            >
              <p className="text-sm">{msg.content}</p>
              <p className="text-xs text-muted-foreground text-right mt-1">
                {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex items-center p-4 border-t">
        <Input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="flex-grow mr-2"
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
}