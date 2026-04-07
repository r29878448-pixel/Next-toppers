'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Hls from 'hls.js'
import { motion, AnimatePresence } from 'motion/react'
import { 
  Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, 
  Settings, Maximize, Minimize, PictureInPicture, SkipBack, SkipForward,
  Check, ChevronRight, Activity, Zap, Shield, Info, Lock, Unlock, Camera
} from 'lucide-react'

interface VideoPlayerProps {
  src: string
  title: string
  poster?: string
}

interface QualityLevel {
  id: number
  height: number
  bitrate: number
}

export default function PremiumVideoPlayer({ src, title, poster }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isBuffering, setIsBuffering] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [activeTab, setActiveTab] = useState<'main' | 'quality' | 'speed'>('main')
  const [qualities, setQualities] = useState<QualityLevel[]>([])
  const [currentQuality, setCurrentQuality] = useState<number>(-1) // -1 is Auto
  const hlsRef = useRef<Hls | null>(null)
  const [isLocked, setIsLocked] = useState(false)
  const [showShortcutHelp, setShowShortcutHelp] = useState(false)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize HLS
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let hls: Hls | null = null

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src
    } else if (Hls.isSupported()) {
      hls = new Hls({
        capLevelToPlayerSize: true,
        autoStartLoad: true,
      })
      hls.loadSource(src)
      hls.attachMedia(video)
      
      hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
        const levels = data.levels.map((level, index) => ({
          id: index,
          height: level.height,
          bitrate: level.bitrate
        })).sort((a, b) => b.height - a.height)
        setQualities(levels)
      })

      hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
        if (hls?.autoLevelEnabled) {
          setCurrentQuality(-1)
        } else {
          setCurrentQuality(data.level)
        }
      })

      hlsRef.current = hls
    }

    return () => {
      if (hls) hls.destroy()
    }
  }, [src])

  // Video Event Handlers
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleTimeUpdate = () => setCurrentTime(video.currentTime)
    const handleDurationChange = () => setDuration(video.duration)
    const handleWaiting = () => setIsBuffering(true)
    const handlePlaying = () => setIsBuffering(false)

    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('durationchange', handleDurationChange)
    video.addEventListener('waiting', handleWaiting)
    video.addEventListener('playing', handlePlaying)

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('durationchange', handleDurationChange)
      video.removeEventListener('waiting', handleWaiting)
      video.removeEventListener('playing', handlePlaying)
    }
  }, [])

  // Controls Visibility
  const handleMouseMove = useCallback(() => {
    setShowControls(true)
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000)
    }
  }, [isPlaying])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    container.addEventListener('mousemove', handleMouseMove)
    return () => container.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  // Actions
  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause()
      else videoRef.current.play()
    }
  }, [isPlaying])

  const seek = useCallback((amount: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += amount
    }
  }, [])

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    setCurrentTime(time)
    if (videoRef.current) videoRef.current.currentTime = time
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value)
    setVolume(val)
    if (videoRef.current) videoRef.current.volume = val
    setIsMuted(val === 0)
  }

  const toggleMute = useCallback(() => {
    const newMuted = !isMuted
    setIsMuted(newMuted)
    if (videoRef.current) videoRef.current.muted = newMuted
  }, [isMuted])

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  const togglePip = async () => {
    if (!videoRef.current) return
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture()
      } else {
        await videoRef.current.requestPictureInPicture()
      }
    } catch (e) {
      console.error('PiP failed', e)
    }
  }

  const changeQuality = (id: number) => {
    if (hlsRef.current) {
      hlsRef.current.currentLevel = id
      setCurrentQuality(id)
    }
    setShowSettings(false)
  }

  const changeSpeed = (rate: number) => {
    setPlaybackRate(rate)
    if (videoRef.current) videoRef.current.playbackRate = rate
    setShowSettings(false)
  }

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor(seconds % 60)
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const takeScreenshot = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      const link = document.createElement('a')
      link.download = `NextToppers-Screenshot-${new Date().getTime()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
  }, [])

  const toggleLock = useCallback(() => {
    setIsLocked(prev => {
      const next = !prev
      if (next) setShowControls(false)
      return next
    })
  }, [])

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return
      if (isLocked && e.key.toLowerCase() !== 'l') return
      
      switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault()
          togglePlay()
          break
        case 'f':
          toggleFullscreen()
          break
        case 'm':
          toggleMute()
          break
        case 'l':
          toggleLock()
          break
        case 's':
          takeScreenshot()
          break
        case 'h':
          setShowShortcutHelp(!showShortcutHelp)
          break
        case 'arrowleft':
          seek(-5)
          break
        case 'arrowright':
          seek(5)
          break
        case 'j':
          seek(-10)
          break
        case 'l':
          if (e.key.toLowerCase() === 'l' && !e.ctrlKey) {
             // Handled above
          } else {
             seek(10)
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPlaying, isFullscreen, isMuted, isLocked, showShortcutHelp, togglePlay, toggleFullscreen, toggleMute, toggleLock, takeScreenshot, seek])

  return (
    <div 
      ref={containerRef}
      className={`relative group w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ${isFullscreen ? 'rounded-none' : ''}`}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain cursor-pointer"
        poster={poster || "https://picsum.photos/seed/video/1280/720"}
        onClick={() => !isLocked && togglePlay()}
        playsInline
      />

      {/* Lock Overlay */}
      <AnimatePresence>
        {isLocked && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/10 pointer-events-none"
          >
            <motion.button
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation()
                toggleLock()
              }}
              className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white pointer-events-auto shadow-2xl"
            >
              <Lock className="w-8 h-8" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shortcut Help Overlay */}
      <AnimatePresence>
        {showShortcutHelp && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-8"
            onClick={() => setShowShortcutHelp(false)}
          >
            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Info className="w-5 h-5 mr-2 text-indigo-400" /> Keyboard Shortcuts
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { key: 'Space / K', label: 'Play / Pause' },
                  { key: 'F', label: 'Fullscreen' },
                  { key: 'M', label: 'Mute' },
                  { key: 'L', label: 'Lock Controls' },
                  { key: 'S', label: 'Screenshot' },
                  { key: 'H', label: 'Toggle Help' },
                  { key: '← / →', label: 'Seek 5s' },
                  { key: 'J / L', label: 'Seek 10s' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                    <span className="text-xs font-mono text-indigo-400">{item.key}</span>
                    <span className="text-xs text-slate-400">{item.label}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => setShowShortcutHelp(false)}
                className="w-full mt-8 py-3 bg-indigo-600 text-white font-bold rounded-xl text-sm hover:bg-indigo-700 transition-colors"
              >
                Got it
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buffering Spinner */}
      <AnimatePresence>
        {isBuffering && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] z-10"
          >
            <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Big Play/Pause Icon Animation */}
      <AnimatePresence mode="wait">
        {!isPlaying && !isBuffering && !isLocked && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          >
            <div className="w-20 h-20 bg-indigo-600/90 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-500/40">
              <Play className="w-10 h-10 text-white fill-current ml-1" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 transition-opacity duration-500 ${(!isLocked && (showControls || !isPlaying)) ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-3 md:p-6 flex items-center justify-between">
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-4 h-4 md:w-6 md:h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-sm md:text-lg leading-tight line-clamp-1">{title}</h2>
              <p className="text-indigo-400 text-[8px] md:text-xs font-medium uppercase tracking-wider">NextToppers Premium Player</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 md:space-x-3">
            <button 
              onClick={takeScreenshot}
              className="p-1.5 md:p-2 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-white/20 transition-colors"
              title="Take Screenshot (S)"
            >
              <Camera className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button 
              onClick={toggleLock}
              className="p-1.5 md:p-2 bg-white/10 backdrop-blur-md rounded-lg text-white hover:bg-white/20 transition-colors"
              title="Lock Screen (L)"
            >
              <Unlock className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <div className="hidden sm:flex px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 items-center space-x-2">
              <Shield className="w-3 h-3 text-green-400" />
              <span className="text-[10px] text-white font-bold uppercase tracking-tighter">Secure Stream</span>
            </div>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 space-y-2 md:space-y-4">
          
          {/* Progress Bar */}
          <div className="relative group/progress">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeekChange}
              className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-indigo-500 hover:h-2 transition-all"
              style={{
                background: `linear-gradient(to right, #6366f1 ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) ${(currentTime / duration) * 100}%)`
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 md:space-x-6">
              <button onClick={togglePlay} className="text-white hover:text-indigo-400 transition-colors">
                {isPlaying ? <Pause className="w-5 h-5 md:w-7 md:h-7 fill-current" /> : <Play className="w-5 h-5 md:w-7 md:h-7 fill-current" />}
              </button>
              
              <div className="flex items-center space-x-2 md:space-x-4">
                <button onClick={() => seek(-10)} className="text-white/70 hover:text-white transition-colors">
                  <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <button onClick={() => seek(10)} className="text-white/70 hover:text-white transition-colors">
                  <RotateCw className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>

              <div className="hidden sm:flex items-center space-x-3 group/volume">
                <button onClick={toggleMute} className="text-white hover:text-indigo-400 transition-colors">
                  {isMuted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-0 group-hover/volume:w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-white transition-all overflow-hidden"
                />
              </div>

              <div className="text-white/90 text-[10px] md:text-sm font-mono tracking-wider">
                {formatTime(currentTime)} <span className="text-white/40 mx-0.5 md:mx-1">/</span> {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center space-x-3 md:space-x-6">
              <div className="relative">
                <button 
                  onClick={() => {
                    setShowSettings(!showSettings)
                    setActiveTab('main')
                  }}
                  className={`text-white hover:text-indigo-400 transition-all duration-300 ${showSettings ? 'rotate-90 text-indigo-400' : ''}`}
                >
                  <Settings className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                {/* Settings Menu */}
                <AnimatePresence>
                  {showSettings && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-full right-0 mb-4 w-48 md:w-64 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl shadow-2xl overflow-hidden z-50"
                    >
                      {activeTab === 'main' && (
                        <div className="p-2">
                          <button 
                            onClick={() => setActiveTab('quality')}
                            className="w-full flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors group"
                          >
                            <div className="flex items-center space-x-3">
                              <Activity className="w-4 h-4 text-indigo-400" />
                              <span className="text-sm text-white font-medium">Quality</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-slate-400">{currentQuality === -1 ? 'Auto' : `${qualities.find(q => q.id === currentQuality)?.height}p`}</span>
                              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </button>
                          <button 
                            onClick={() => setActiveTab('speed')}
                            className="w-full flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors group"
                          >
                            <div className="flex items-center space-x-3">
                              <Zap className="w-4 h-4 text-indigo-400" />
                              <span className="text-sm text-white font-medium">Playback Speed</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-slate-400">{playbackRate}x</span>
                              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </button>
                        </div>
                      )}

                      {activeTab === 'quality' && (
                        <div className="p-2">
                          <button onClick={() => setActiveTab('main')} className="w-full text-left p-3 text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors">
                            Back
                          </button>
                          <div className="max-h-48 overflow-y-auto custom-scrollbar">
                            <button 
                              onClick={() => changeQuality(-1)}
                              className="w-full flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors"
                            >
                              <span className="text-sm text-white">Auto</span>
                              {currentQuality === -1 && <Check className="w-4 h-4 text-indigo-400" />}
                            </button>
                            {qualities.map((q) => (
                              <button 
                                key={q.id}
                                onClick={() => changeQuality(q.id)}
                                className="w-full flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors"
                              >
                                <span className="text-sm text-white">{q.height}p</span>
                                {currentQuality === q.id && <Check className="w-4 h-4 text-indigo-400" />}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {activeTab === 'speed' && (
                        <div className="p-2">
                          <button onClick={() => setActiveTab('main')} className="w-full text-left p-3 text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-white transition-colors">
                            Back
                          </button>
                          {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                            <button 
                              key={rate}
                              onClick={() => changeSpeed(rate)}
                              className="w-full flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors"
                            >
                              <span className="text-sm text-white">{rate}x</span>
                              {playbackRate === rate && <Check className="w-4 h-4 text-indigo-400" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button onClick={togglePip} className="text-white hover:text-indigo-400 transition-colors">
                <PictureInPicture className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              
              <button onClick={toggleFullscreen} className="text-white hover:text-indigo-400 transition-colors">
                {isFullscreen ? <Minimize className="w-5 h-5 md:w-6 md:h-6" /> : <Maximize className="w-5 h-5 md:w-6 md:h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 14px;
          height: 14px;
          background: white;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  )
}
