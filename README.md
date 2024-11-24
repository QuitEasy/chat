# QuitEasy - AI-Powered Smoking Cessation Platform

QuitEasy is an innovative web application that provides personalized AI support for individuals looking to quit smoking. Using advanced AI technology, it offers tailored guidance, motivation, and strategies for a successful smoking cessation journey.

## Features

- Personalized AI chat support
- Responsive design for all devices
- Multi-language support
- Progress tracking
- Real-time conversation history

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   composer install
   ```
3. Copy `.env.example` to `.env` and add your Gemini API key:
   ```bash
   cp .env.example .env
   ```
4. Configure your web server (Apache/Nginx) to serve the application
5. Ensure PHP 7.4 or higher is installed

## Deployment Requirements

- PHP 7.4+
- SSL Certificate (for secure API communication)
- Web server (Apache/Nginx)
- Composer for dependency management

## Security Considerations

- Store API keys in environment variables
- Enable HTTPS
- Implement rate limiting
- Regular security updates
