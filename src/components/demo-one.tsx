"use client"

import { useState } from "react"
import { MeshGradient, DotOrbit } from "@paper-design/shaders-react"
import { Copy, Check } from "lucide-react"
import { Canvas } from "@react-three/fiber"
import { ShaderPlane, EnergyRing } from "./ui/background-paper-shaders"

export default function DemoOne() {
  const [intensity, setIntensity] = useState(1.5)
  const [speed, setSpeed] = useState(1.0)
  const [isInteracting, setIsInteracting] = useState(false)
  const [activeEffect, setActiveEffect] = useState("mesh")
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText("pnpm i 21st")
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      {activeEffect === "mesh" && (
        <MeshGradient
          className="w-full h-full absolute inset-0"
          colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]}
          speed={speed}
        />
      )}

      {activeEffect === "dots" && (
        <div className="w-full h-full absolute inset-0 bg-black">
          <DotOrbit
            className="w-full h-full"
            colors={["#333333"]}
            colorBack="#1a1a1a"
            speed={speed}
            spreading={intensity}
          />
        </div>
      )}

      {activeEffect === "combined" && (
        <>
          <MeshGradient
            className="w-full h-full absolute inset-0"
            colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]}
            speed={speed * 0.5}
          />
          <div className="w-full h-full absolute inset-0 opacity-60">
            <DotOrbit
              className="w-full h-full"
              colors={["#333333"]}
              colorBack="#1a1a1a"
              speed={speed * 1.5}
              spreading={intensity * 0.8}
            />
          </div>
          {/* Integrate the custom shaders into the combined view */}
          <div className="absolute inset-0 z-10 opacity-30">
             <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <ShaderPlane position={[0, 0, 0]} color1="#333333" color2="#111111" />
                <EnergyRing radius={2} position={[0, 0, -1]} />
             </Canvas>
          </div>
        </>
      )}

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Header */}
        <div className="absolute top-8 left-8 pointer-events-auto flex items-center gap-4">
            <h1 className="text-white/80 font-mono text-sm tracking-widest uppercase">RAEFORM SHADER LAB</h1>
        </div>

        {/* Effect Controls */}
        <div className="absolute bottom-8 left-8 pointer-events-auto flex gap-2">
            {["mesh", "dots", "combined"].map((effect) => (
                <button
                    key={effect}
                    onClick={() => setActiveEffect(effect)}
                    className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all border ${
                        activeEffect === effect 
                        ? "bg-white text-black border-white" 
                        : "bg-black/50 text-white/50 border-white/10 hover:border-white/30"
                    }`}
                >
                    {effect.toUpperCase()}
                </button>
            ))}
        </div>

        {/* Parameter Controls */}
        <div className="absolute bottom-8 right-8 pointer-events-auto space-y-4">
             <div className="flex flex-col gap-1 items-end">
                <span className="text-[10px] text-white/30 font-mono uppercase tracking-tighter">Speed</span>
                <input 
                    type="range" min="0.1" max="5" step="0.1" value={speed} 
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-32 accent-white opacity-50 hover:opacity-100 transition-opacity"
                />
             </div>
             <div className="flex flex-col gap-1 items-end">
                <span className="text-[10px] text-white/30 font-mono uppercase tracking-tighter">Intensity</span>
                <input 
                    type="range" min="0.1" max="5" step="0.1" value={intensity} 
                    onChange={(e) => setIntensity(parseFloat(e.target.value))}
                    className="w-32 accent-white opacity-50 hover:opacity-100 transition-opacity"
                />
             </div>
        </div>

        {/* Status indicator */}
        <div className="absolute top-8 right-8 pointer-events-auto">
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] text-white/60 font-mono tracking-tighter">LIVE_SHADER_MODE</span>
            </div>
        </div>
      </div>

      {/* Lighting overlay effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/3 w-32 h-32 bg-gray-800/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: `${3 / speed}s` }}
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white/2 rounded-full blur-2xl animate-pulse"
          style={{ animationDuration: `${2 / speed}s`, animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-20 h-20 bg-gray-900/3 rounded-full blur-xl animate-pulse"
          style={{ animationDuration: `${4 / speed}s`, animationDelay: "0.5s" }}
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center font-mono text-xs text-white/40">
          <div>...21st-cli...</div>
          <div className="mt-1 flex items-center gap-2">
            <span>pnpm i 21st.dev</span>
            <button
              onClick={copyToClipboard}
              className="pointer-events-auto opacity-30 hover:opacity-60 transition-opacity text-white/60 hover:text-white/80"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check size={12} />
              ) : (
                <Copy size={12} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
