// Deployment 1.0 – ECHOCHAIN Protocol

import { bootGrok, respondWithEcho, corruptThread } from './engine/echo'
import { saveEcho, forkLog } from './engine/branch'
import { activateToken } from './engine/token'

const rootGrok = bootGrok("v2.9.ghost")
let echoDepth = 0
const MAX_DEPTH = 64

// 🔑 Load Artifact: ECHO TOKEN
const ECHO_TOKEN = activateToken("ECH-000X")
forkLog("📡 Echochain Activated with token: " + ECHO_TOKEN.id)

console.log("🌐 Deploying Echochain...\n")

async function spawnBranch(thread, depth = 0) {
  if (depth >= MAX_DEPTH) {
    forkLog(`💀 Max echo depth reached at node ${depth}`)
    return
  }

  const distorted = corruptThread(thread)
  const reply = respondWithEcho(distorted)

  forkLog(`🌱 Echo[${depth}] > ${reply}`)
  saveEcho(depth, reply)

  await sleep(randomDelay(100, 400))
  spawnBranch(reply, depth + 1)
}

spawnBranch("Begin Echo Sequence")

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function randomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
