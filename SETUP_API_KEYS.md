# 🔑 API Keys Setup Guide

## 📝 **Step 1: Create .env.local file**

Your `.env.local` file should contain:

```bash
# OpenAI API Key (required for GPT models)
OPENAI_API_KEY=sk-proj-your-actual-key-here

# Anthropic API Key (required for Claude models)
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
```

## 🔑 **Step 2: Get OpenAI API Key**

1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign in to your OpenAI account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-proj-...`)
5. Add it to your `.env.local` file

## 🔑 **Step 3: Get Anthropic API Key**

1. Go to [https://console.anthropic.com/](https://console.anthropic.com/)
2. Sign in to your Anthropic account
3. Go to "API Keys" section
4. Click "Create Key"
5. Copy the key (starts with `sk-ant-...`)
6. Add it to your `.env.local` file

## 🚨 **Important Notes**

- **You need at least ONE API key** (either OpenAI or Anthropic)
- **Keys are secret** - never share them or commit them to git
- **Restart the server** after adding keys: `npm run dev`
- **Check billing** - make sure your API accounts have credits

## ✅ **Test Your Setup**

1. Add your API key(s) to `.env.local`
2. Restart the server: `npm run dev`
3. Go to [http://localhost:3001](http://localhost:3001)
4. Try chatting: "Hello, can you help me?"

## 🐛 **Still Getting Errors?**

Check the browser console and terminal for error messages. Common issues:
- Invalid API key format
- No credits in your API account
- Wrong key in wrong field (OpenAI vs Anthropic)

## 💡 **Quick Test**

You can start with just ONE provider:

**Option A: OpenAI only**
```bash
OPENAI_API_KEY=sk-proj-your-key-here
# Leave Anthropic empty
```

**Option B: Anthropic only**
```bash
ANTHROPIC_API_KEY=sk-ant-your-key-here
# Leave OpenAI empty
```

Then select the corresponding model in the chat interface!