// StudyPath — app.js
// Animações da tela de entrada

setTimeout(() => {

  // Anima as barras de progresso
  document.getElementById('b1').style.width = '72%'
  document.getElementById('b2').style.width = '60%'
  document.getElementById('b3').style.width = '38%'
  document.getElementById('b4').style.width = '22%'

  // Anima a média geral de 0 até 7.4
  let avg = 0
  const t1 = setInterval(() => {
    avg = Math.min(+(avg + 0.15).toFixed(2), 7.4)
    document.getElementById('avg').textContent = avg.toFixed(1)
    if (avg >= 7.4) clearInterval(t1)
  }, 25)

  // Anima o progresso de 0% até 48%
  let prog = 0
  const t2 = setInterval(() => {
    prog = Math.min(prog + 2, 48)
    document.getElementById('prog').textContent = prog + '%'
    if (prog >= 48) clearInterval(t2)
  }, 35)

}, 400)
