/* Every equation named in the 4PH1 specification, grouped by section.
   p2: true  -> Physics only (bold in the spec, assessed on Paper 2) */
window.EQUATIONS = [
  { s:1, name:'Average speed', eq:'v = s / t', words:'average speed = distance moved ÷ time taken', units:'v in m/s, s in m, t in s' },
  { s:1, name:'Acceleration', eq:'a = (v − u) / t', words:'acceleration = change in velocity ÷ time taken', units:'a in m/s², u and v in m/s, t in s' },
  { s:1, name:'Uniform acceleration', eq:'v² = u² + 2as', words:'final speed² = initial speed² + (2 × acceleration × distance)', units:'use when time is not involved' },
  { s:1, name:'Newton’s second law', eq:'F = m × a', words:'force = mass × acceleration', units:'F in N, m in kg, a in m/s²' },
  { s:1, name:'Weight', eq:'W = m × g', words:'weight = mass × gravitational field strength', units:'W in N, m in kg, g in N/kg' },
  { s:1, name:'Hooke’s law', eq:'F = k × x', words:'force = spring constant × extension', units:'k in N/m, x in m' },
  { s:1, name:'Momentum', eq:'p = m × v', words:'momentum = mass × velocity', units:'p in kg m/s', p2:true },
  { s:1, name:'Force and momentum', eq:'F = (mv − mu) / t', words:'force = change in momentum ÷ time taken', units:'F in N', p2:true },
  { s:1, name:'Moment of a force', eq:'M = F × d', words:'moment = force × perpendicular distance from the pivot', units:'M in N m, d in m' },

  { s:2, name:'Electrical power', eq:'P = I × V', words:'power = current × voltage', units:'P in W, I in A, V in V' },
  { s:2, name:'Electrical energy', eq:'E = I × V × t', words:'energy transferred = current × voltage × time', units:'E in J, t in s' },
  { s:2, name:'Ohm’s law', eq:'V = I × R', words:'voltage = current × resistance', units:'V in V, I in A, R in Ω' },
  { s:2, name:'Charge', eq:'Q = I × t', words:'charge = current × time', units:'Q in C, I in A, t in s' },
  { s:2, name:'Energy and charge', eq:'E = Q × V', words:'energy transferred = charge × voltage', units:'E in J, Q in C, V in V' },

  { s:3, name:'Wave equation', eq:'v = f × λ', words:'wave speed = frequency × wavelength', units:'v in m/s, f in Hz, λ in m' },
  { s:3, name:'Frequency and period', eq:'f = 1 / T', words:'frequency = 1 ÷ time period', units:'f in Hz, T in s' },
  { s:3, name:'Refractive index', eq:'n = sin i / sin r', words:'refractive index = sin(angle of incidence) ÷ sin(angle of refraction)', units:'no units; angles in degrees' },
  { s:3, name:'Critical angle', eq:'sin c = 1 / n', words:'sin(critical angle) = 1 ÷ refractive index', units:'c in degrees' },

  { s:4, name:'Efficiency', eq:'efficiency = (useful energy output ÷ total energy input) × 100%', words:'also works with useful power output ÷ total power input', units:'a percentage, never above 100%' },
  { s:4, name:'Work done', eq:'W = F × d', words:'work done = force × distance moved in the direction of the force', units:'W in J, F in N, d in m' },
  { s:4, name:'Gravitational potential energy', eq:'GPE = m × g × h', words:'GPE = mass × gravitational field strength × height', units:'GPE in J, h is vertical height in m' },
  { s:4, name:'Kinetic energy', eq:'KE = ½ × m × v²', words:'kinetic energy = ½ × mass × speed²', units:'KE in J, m in kg, v in m/s' },
  { s:4, name:'Power', eq:'P = W / t', words:'power = work done ÷ time taken', units:'P in W, W in J, t in s' },

  { s:5, name:'Density', eq:'ρ = m / V', words:'density = mass ÷ volume', units:'ρ in kg/m³, m in kg, V in m³' },
  { s:5, name:'Pressure', eq:'p = F / A', words:'pressure = force ÷ area', units:'p in Pa, F in N, A in m²' },
  { s:5, name:'Pressure difference in a liquid', eq:'p = h × ρ × g', words:'pressure difference = height × density × gravitational field strength', units:'p in Pa, h in m, ρ in kg/m³' },
  { s:5, name:'Specific heat capacity', eq:'ΔQ = m × c × ΔT', words:'change in thermal energy = mass × specific heat capacity × change in temperature', units:'ΔQ in J, c in J/(kg °C)' },
  { s:5, name:'Kelvin conversion', eq:'T (K) = θ (°C) + 273', words:'kelvin temperature = Celsius temperature + 273', units:'always convert before a gas law', p2:true },
  { s:5, name:'Boyle’s law', eq:'p₁V₁ = p₂V₂', words:'for a fixed mass of gas at constant temperature', units:'consistent units on both sides', p2:true },
  { s:5, name:'Pressure law', eq:'p₁ / T₁ = p₂ / T₂', words:'for a fixed mass of gas at constant volume', units:'T must be in kelvin', p2:true },

  { s:6, name:'Force on a conductor', eq:'F = B × I × l', words:'force = magnetic flux density × current × length', units:'F in N, B in T, I in A, l in m', p2:true },
  { s:6, name:'Transformer turns ratio', eq:'V_p / V_s = n_p / n_s', words:'primary voltage ÷ secondary voltage = primary turns ÷ secondary turns', units:'voltages in V' },
  { s:6, name:'Ideal transformer power', eq:'V_p × I_p = V_s × I_s', words:'power in = power out for a 100% efficient transformer', units:'V in V, I in A' },

  { s:8, name:'Orbital speed', eq:'v = 2πr / T', words:'orbital speed = (2 × π × orbital radius) ÷ time period', units:'v in m/s, r in m, T in s' },
  { s:8, name:'Hubble’s law', eq:'v = H₀ × d', words:'speed of recession = Hubble constant × distance', units:'v in m/s, d in m, H₀ in s⁻¹' },
  { s:8, name:'Age of the Universe', eq:'age ≈ 1 / H₀', words:'the reciprocal of the Hubble constant estimates the age of the Universe', units:'answer in seconds' }
];
