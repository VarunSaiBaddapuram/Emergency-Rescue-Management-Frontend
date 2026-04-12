import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Stack, Paper, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';

interface DisasterInfo {
  name: string;
  information: string;
  precautions: string[];
}

interface Message {
  text: string;
  sender: 'bot' | 'user';
}

const disasterChat: { disasters: DisasterInfo[] } = {
  "disasters": [
    {
      "name": "Earthquake",
      "information": "An earthquake is the shaking of the surface of the Earth resulting from a sudden release of energy in the Earth's lithosphere that creates seismic waves.",
      "precautions": [
        "Drop, Cover, and Hold On during shaking.",
        "Move away from windows and heavy furniture.",
        "Have an emergency kit with essential supplies."
      ]
    },
    {
      "name": "Help",
      "information": "Click the SOS button and the Rescue team will save you.",
      "precautions": ["Stay safe in your home"],
    },
    {
      "name": "Hi",
      "information": "Hello! Press the SOS Button in case of Emergency.",
      "precautions": ["Stay safe in your home"],
    },
    {
      "name": "Wildfire",
      "information": "A wildfire is an uncontrolled fire in an area of combustible vegetation.",
      "precautions": [
        "Create a defensible space around your home.",
        "Evacuate early if instructed to do so.",
        "Have a 'go bag' with important documents and supplies."
      ]
    },
    {
      "name": "Flood",
      "information": "A flood is the overflow of water onto normally dry land.",
      "precautions": [
        "Move to higher ground if in a flood-prone area.",
        "Do not walk or drive through floodwaters.",
        "Have an emergency flood kit with necessary supplies."
      ]
    },
    {
      "name": "Drought",
      "information": "A drought is a prolonged period of abnormally low rainfall, leading to a shortage of water.",
      "precautions": [
        "Conserve water by fixing leaks and using water-efficient appliances.",
        "Plan for water scarcity by storing water and having alternative sources.",
        "Follow local water use restrictions and guidelines."
      ]
    },
    {
      "name": "Cyclone",
      "information": "A cyclone is a large-scale, atmospheric circulation system characterized by low-pressure centers and strong winds.",
      "precautions": [
        "Stay informed about cyclone warnings and evacuation orders.",
        "Secure outdoor objects and reinforce windows.",
        "Have an emergency kit with essential items."
      ]
    }
  ]
};

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const initialBotMessage: Message = {
      text: "Hello! I'm here to help you with information about disasters. Feel free to ask for assistance or information.",
      sender: 'bot'
    };
    setMessages([initialBotMessage]);
  }, []);

  const displayInfo = (disaster: DisasterInfo) => {
    const infoMessages: Message[] = [
      { text: `${disaster.name}: ${disaster.information}`, sender: 'bot' }
    ];
    if (disaster.precautions.length > 0) {
      infoMessages.push({ text: 'Safety precautions:', sender: 'bot' });
      disaster.precautions.forEach((p) => {
        infoMessages.push({ text: `• ${p}`, sender: 'bot' });
      });
    }
    setMessages((prev) => [...prev, ...infoMessages]);
  };

  const simulateBotResponse = () => {
    const botResponse: Message = {
      text: "Is there anything else you'd like to know or ask about?",
      sender: 'bot'
    };
    setMessages((prev) => [...prev, botResponse]);
  };

  const handleSend = () => {
    if (inputValue.trim() !== '') {
      const userMsg: Message = { text: inputValue, sender: 'user' };
      setMessages((prev) => [...prev, userMsg]);

      const matchedDisaster = disasterChat.disasters.find(
        (disaster) => inputValue.toLowerCase().includes(disaster.name.toLowerCase())
      );

      if (matchedDisaster) {
        displayInfo(matchedDisaster);
        setTimeout(() => simulateBotResponse(), 1000);
      } else {
        const fallback: Message = {
          text: "I'm sorry, I don't have specific info on that yet. Try asking about Earthquake, Flood, Wildfire, or Cyclone.",
          sender: 'bot'
        };
        setMessages((prev) => [...prev, fallback]);
      }
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 2, overflow: 'hidden', bgcolor: '#fff' }}>
      <Box sx={{ p: 1.5, bgcolor: 'primary.main', color: '#fff' }}>
        <Typography variant="button" fontWeight="bold">Rescue Assistant</Typography>
      </Box>
      <Box sx={{ height: 300, overflowY: 'auto', p: 2, bgcolor: '#f5f7f9' }}>
        <Stack spacing={1.5}>
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                alignItems: 'flex-start',
                gap: 1
              }}
            >
              {msg.sender === 'bot' && <SmartToyIcon fontSize="small" color="primary" sx={{ mt: 0.5 }} />}
              <Paper
                elevation={1}
                sx={{
                  p: 1.5,
                  maxWidth: '85%',
                  bgcolor: msg.sender === 'user' ? 'primary.main' : '#fff',
                  color: msg.sender === 'user' ? '#fff' : 'text.primary',
                  borderRadius: msg.sender === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                }}
              >
                <Typography variant="body2">{msg.text}</Typography>
              </Paper>
              {msg.sender === 'user' && <PersonIcon fontSize="small" color="action" sx={{ mt: 0.5 }} />}
            </Box>
          ))}
        </Stack>
      </Box>
      <Box sx={{ p: 1, borderTop: '1px solid #e0e0e0', display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Topic (e.g. Flood)..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          variant="outlined"
        />
        <IconButton color="primary" onClick={handleSend} disabled={!inputValue.trim()}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Chatbot;