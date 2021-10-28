import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Home() {
  const [power, setPower] = useState(true)
  const [bank, setBank] = useState(false)
  const [action, setAction] = useState('Power On')

  const handleKits = (kit) => {
    if(kit === 'piano') {
      document.querySelector('#Q').src = 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
      document.querySelector('#W').src = 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
      document.querySelector('#E').src = 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
      document.querySelector('#A').src = 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
      document.querySelector('#S').src = 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
      document.querySelector('#D').src = 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
      document.querySelector('#Z').src = 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
      document.querySelector('#X').src = 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
      document.querySelector('#C').src = 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
    } else {
      document.querySelector('#Q').src = 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
      document.querySelector('#W').src = 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
      document.querySelector('#E').src = 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
      document.querySelector('#A').src = 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
      document.querySelector('#S').src = 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
      document.querySelector('#D').src = 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
      document.querySelector('#Z').src = 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
      document.querySelector('#X').src = 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
      document.querySelector('#C').src = 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  }

  const handlePower = () => {
    setPower(power => !power)
    setAction(`Power ${power ? 'Off' : 'On'}`)
    
    if(power) {
      document.querySelector('#Q').src = '#'
      document.querySelector('#W').src = '#'
      document.querySelector('#E').src = '#'
      document.querySelector('#A').src = '#'
      document.querySelector('#S').src = '#'
      document.querySelector('#D').src = '#'
      document.querySelector('#Z').src = '#'
      document.querySelector('#X').src = '#'
      document.querySelector('#C').src = '#'
    } else {
      if(bank === false) handleKits('piano')
      else handleKits('heater')
    }
  }

  const handleVolume = (e) => {
    document.querySelector('#Q').volume = e.target.value
    document.querySelector('#W').volume = e.target.value
    document.querySelector('#E').volume = e.target.value
    document.querySelector('#A').volume = e.target.value
    document.querySelector('#S').volume = e.target.value
    document.querySelector('#D').volume = e.target.value
    document.querySelector('#Z').volume = e.target.value
    document.querySelector('#X').volume = e.target.value
    document.querySelector('#C').volume = e.target.value
    setAction(`Volume - ${parseInt(e.target.value * 100)}%`)
  }

  const handleBank = () => {
    if(!power) return false

    setBank(bank => !bank)
    setAction(`${bank ? 'Smooth Piano Kit' : 'Heater Kit'}`)

    if(bank) handleKits('piano')
    else handleKits('heater')
  }

  const handleKeyName = (key) => {
    if(!bank) {
      switch (key) {
        case 'Q':
          setAction('Chord 1')
          break;
        case 'W':
          setAction('Chord 2')
          break;
        case 'E':
          setAction('Chord 3')
          break;
        case 'A':
          setAction('Shaker')
          break;
        case 'S':
          setAction('Open HH')
          break;
        case 'D':
          setAction('Closed HH')
          break;
        case 'Z':
          setAction('Punchy Kick')
          break;
        case 'X':
          setAction('Side Kick')
          break;
        case 'C':
          setAction('Snare')
          break;
      
        default:
          break;
      }
    } else if(bank){
      switch (key) {
        case 'Q':
          setAction('Heater 1')
          break;
        case 'W':
          setAction('Heater 2')
          break;
        case 'E':
          setAction('Heater 3')
          break;
        case 'A':
          setAction('Heater 4')
          break;
        case 'S':
          setAction('Clap')
          break;
        case 'D':
          setAction('Open HH')
          break;
        case 'Z':
          setAction('Kick n\' Hat')
          break;
        case 'X':
          setAction('Kick')
          break;
        case 'C':
          setAction('Closed HH')
          break;
      
        default:
          break;
      }
    }
  }

  const handleMouseDown = async (document) => {
    if(!power) return false
    document.style.background = 'orange'
    document.style.transform = 'translateY(1px)'
    document.style.boxShadow = 'gray 3px 3px 5px';
    handleKeyName(document.getElementsByTagName('AUDIO')[0].id)
    await document.getElementsByTagName('AUDIO')[0].play()
  }

  const handleMouseUp = (document) => {
    if(!power) return false
    document.style.background = ''
    document.style.transform = ''
    document.style.boxShadow = ''
  }

  useEffect(() => {
    document.addEventListener('keydown', async (e) => {
      e.preventDefault()
      const notes = [ 'Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C' ]
      const key = power ? e.key?.toUpperCase() : ''

      if(notes.includes(key)) {
        const element = document.querySelector(`#key${key}`)
        
        handleMouseDown(element)
        handleKeyName(key)
        await element.getElementsByTagName('AUDIO')[0].play()

        e.target.addEventListener('keyup', () => {
          handleMouseUp(element)
        })
      }
    })
  }, [bank, power])

  return (
    <>
      <Head>
        <title>Drum Set</title>
        <link rel="icon" type="image/png" href="/favicon32.png" sizes="32x32"></link>
      </Head>
      <div style={{ backgroundImage: `url('https://wallpaperaccess.com/full/1262462.jpg')`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }} 
        className="min-h-screen flex items-center justify-center p-4 select-none">
        <div className="w-full h-auto bg-gray-300 px-8 md:w-max">
          <h2 className="flex items-center justify-end font-bold text-xl italic p-2">
            <span className="text-gray-700 text-2xl">{'<'}</span>
            <span className="text-yellow-700">Tosin</span>
            <span className="text-gray-700 text-2xl pl-2">{'/>'}</span>
          </h2>
          <div className="flex flex-col justify-between items-center md:flex-row">
            <div className="grid grid-cols-3 gap-4 pb-8 w-full md:w-max">
              <div id="keyQ" className="btn text-xl h-20 bg-gray-400 rounded md:w-24" onMouseDown={e => handleMouseDown(e.target)} onMouseUp={e => handleMouseUp(e.target)}>
                <audio id="Q" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" />
                Q
              </div>
              <div id="keyW" className="btn text-xl h-20 bg-gray-400 rounded md:w-24" onMouseDown={e => handleMouseDown(e.target)} onMouseUp={e => handleMouseUp(e.target)}>
                <audio id="W" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" />
                W
              </div>
              <div id="keyE" className="btn text-xl h-20 bg-gray-400 rounded md:w-24" onMouseDown={e => handleMouseDown(e.target)} onMouseUp={e => handleMouseUp(e.target)}>
                <audio id="E" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" />
                E
              </div>
              <div id="keyA" className="btn text-xl h-20 bg-gray-400 rounded md:w-24" onMouseDown={e => handleMouseDown(e.target)} onMouseUp={e => handleMouseUp(e.target)}>
                <audio id="A" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" />
                A
              </div>
              <div id="keyS" className="btn text-xl h-20 bg-gray-400 rounded md:w-24" onMouseDown={e => handleMouseDown(e.target)} onMouseUp={e => handleMouseUp(e.target)}>
                <audio id="S" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" />
                S
              </div>
              <div id="keyD" className="btn text-xl h-20 bg-gray-400 rounded md:w-24" onMouseDown={e => handleMouseDown(e.target)} onMouseUp={e => handleMouseUp(e.target)}>
                <audio id="D" src="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" />
                D
              </div>
              <div id="keyZ" className="btn text-xl h-20 bg-gray-400 rounded md:w-24" onMouseDown={e => handleMouseDown(e.target)} onMouseUp={e => handleMouseUp(e.target)}>
                <audio id="Z" src="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3" />
                Z
              </div>
              <div id="keyX" className="btn text-xl h-20 bg-gray-400 rounded md:w-24" onMouseDown={e => handleMouseDown(e.target)} onMouseUp={e => handleMouseUp(e.target)}>
                <audio id="X" src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" />
                X
              </div>
              <div id="keyC" className="btn text-xl h-20 bg-gray-400 rounded md:w-24" onMouseDown={e => handleMouseDown(e.target)} onMouseUp={e => handleMouseUp(e.target)}>
                <audio id="C" src="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" />
                C
              </div>
            </div>
            <div className="flex flex-col items-center justify-center p-4 w-100 md:w-3/6">
              <div className="font-bold text-center">
                Power
                <div style={{ flexDirection: !power ? 'row-reverse' : '' }} className="flex justify-between bg-gray-200 w-16 h-7 p-0.5 cursor-pointer" onClick={handlePower}>
                  <div className="w-2/5"></div>
                  <div style={{ opacity: !power ? '0.6' : '' }} className="w-2/5 bg-blue-500"></div>
                </div>
              </div>
              <div className="flex justify-center h-12 my-4 w-full md:w-80 capitalize">
                <div className="flex items-center justify-center font-bold text-lg bg-gray-400 w-60 h-full md:w-3/4">{ action }</div>
              </div>
              <div className="py-2">
                <input type="range" step="0.01" min="0" max="1" onChange={handleVolume} disabled={!power} />
              </div>
              <div className="font-bold text-center">
                Bank
                <div style={{ flexDirection: !bank ? 'row-reverse' : '' }} className="flex justify-between bg-gray-200 w-16 h-7 p-0.5 cursor-pointer" onClick={handleBank}>
                  <div className="w-2/5"></div>
                  <div className="w-2/5 bg-blue-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
