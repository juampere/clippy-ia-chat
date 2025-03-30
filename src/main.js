import './style.css'
import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { streamText } from 'ai'

const openrouter = createOpenRouter({
  apiKey: import.meta.env.VITE_OPENROUTER_KEY,
  
  
})

const submitBtn = document.querySelector('#submit')
const app = document.querySelector('#app')
const form = document.querySelector('#form')

form.addEventListener('submit', async e=> {
  e.preventDefault()

  const prompt = document.querySelector('#prompt').value

  if (prompt === '') {
    alert('Por favor escribe una pregunta')
    return
  }

  submitBtn.disabled = true

  const result = streamText({
    //model: openrouter('google/gemini-2.5-pro-exp-03-25:free'),
    //model: openrouter('deepseek/deepseek-v3-base:free'),
    // model: openrouter('qwen/qwen2.5-vl-3b-instruct:free'),
    // model: openrouter('google/gemma-3-27b-it:free'),
    model: openrouter('meta-llama/llama-3.3-70b-instruct:free'),
    prompt,
    //system: 'eres un ejecutivo de una empresa de tecnología, responde como un experto en el tema',
  })

  while (app.firstChild) {
    app.removeChild(app.firstChild)
  }

  for await (const text of result.textStream) {
    app.append(text)
  }

  submitBtn.disabled = false
})