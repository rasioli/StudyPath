// StudyPath — app.js
// Anima o dashboard da index com dados reais do localStorage

function lerDisciplinas() {
  try {
    return JSON.parse(localStorage.getItem('sp_disciplinas') || '[]')
  } catch (e) {
    return []
  }
}

// Dados de demonstração usados quando não há disciplinas cadastradas
const DEMO = {
  disciplinas: [
    { nome: 'Banco de Dados', prog: 72, nota: 8.5, status: 'Em dia' },
    { nome: 'JavaScript',     prog: 60, nota: 7.2, status: 'Em dia' },
    { nome: 'Python',         prog: 38, nota: 5.8, status: 'Atenção' },
    { nome: 'Modelagem',      prog: 22, nota: 4.1, status: 'Atrasado' }
  ],
  avg: 7.4,
  prog: 48
}

const CORES_BAR = ['#185FA5', '#378ADD', '#EF9F27', '#E24B4A']

setTimeout(() => {
  const disciplinas = lerDisciplinas()
  const isDemo = disciplinas.length === 0
  const fonte = isDemo ? DEMO.disciplinas : disciplinas.slice(0, 4)

  // Atualiza nomes, percentuais e badges nas barras
  const barNames  = document.querySelectorAll('.bar-name')
  const barPcts   = document.querySelectorAll('.bar-pct')
  const badgesSm  = document.querySelectorAll('.badge-sm')
  const barIds    = ['b1', 'b2', 'b3', 'b4']

  fonte.forEach((d, i) => {
    if (barNames[i])  barNames[i].textContent  = d.nome
    if (barPcts[i])   barPcts[i].textContent   = d.prog + '%'
    if (badgesSm[i]) {
      const s = d.status || 'Em dia'
      badgesSm[i].textContent  = s
      badgesSm[i].className    = 'badge-sm ' + (s === 'Em dia' ? 'ok' : s === 'Atenção' ? 'warn' : 'alert')
    }
    const el = document.getElementById(barIds[i])
    if (el) {
      el.style.background = CORES_BAR[i] || '#185FA5'
      el.style.width = d.prog + '%'
    }
  })

  // Calcula média e progresso reais ou usa demo
  let avgFinal, progFinal
  if (isDemo) {
    avgFinal  = DEMO.avg
    progFinal = DEMO.prog
  } else {
    avgFinal  = parseFloat((disciplinas.reduce((a, d) => a + (d.nota || 0), 0) / disciplinas.length).toFixed(1))
    progFinal = Math.round(disciplinas.reduce((a, d) => a + (d.prog || 0), 0) / disciplinas.length)
  }

  // Anima média geral
  let avg = 0
  const t1 = setInterval(() => {
    avg = Math.min(+(avg + 0.15).toFixed(2), avgFinal)
    const el = document.getElementById('avg')
    if (el) el.textContent = avg.toFixed(1)
    if (avg >= avgFinal) clearInterval(t1)
  }, 25)

  // Anima progresso geral
  let prog = 0
  const t2 = setInterval(() => {
    prog = Math.min(prog + 2, progFinal)
    const el = document.getElementById('prog')
    if (el) el.textContent = prog + '%'
    if (prog >= progFinal) clearInterval(t2)
  }, 35)

  // Atualiza badge do dashboard
  const badge = document.getElementById('dash-badge')
  if (badge) {
    if (isDemo) {
      badge.textContent        = '● Demonstração'
      badge.style.background   = '#FAEEDA'
      badge.style.color        = '#854F0B'
    } else {
      badge.textContent        = '● Seus dados'
      badge.style.background   = '#E6F1FB'
      badge.style.color        = '#185FA5'
    }
  }

  // Atualiza contador de matérias
  const metMat = document.getElementById('metric-materias')
  if (metMat) metMat.textContent = isDemo ? '4' : disciplinas.length

}, 400)
