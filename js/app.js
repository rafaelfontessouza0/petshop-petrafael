/**
 * PetRafael — scripts gerais do site
 * Relógio em tempo real, saudação conforme horário e utilidades de interface.
 */

(function () {
  'use strict';

  /**
   * Atualiza o elemento #relogio-petrafael com data e hora locais (atualiza a cada segundo).
   */
  function iniciarRelogio() {
    var el = document.getElementById('relogio-petrafael');
    if (!el) return;

    function tick() {
      var agora = new Date();
      var opcoes = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      };
      try {
        el.textContent = agora.toLocaleString('pt-BR', opcoes);
      } catch (e) {
        el.textContent = agora.toString();
      }
    }

    tick();
    window.setInterval(tick, 1000);
  }

  /**
   * Define texto de saudação em #saudacao-dinamica com base no horário (Bom dia / Boa tarde / Boa noite).
   */
  function definirSaudacao() {
    var el = document.getElementById('saudacao-dinamica');
    if (!el) return;

    var h = new Date().getHours();
    var msg;
    if (h >= 5 && h < 12) msg = 'Bom dia';
    else if (h >= 12 && h < 18) msg = 'Boa tarde';
    else msg = 'Boa noite';

    el.textContent = msg + '! Obrigado por visitar o PetRafael.';
  }

  /**
   * Ano atual no rodapé (#ano-atual), evita desatualizar manualmente o copyright.
   */
  function anoAtualRodape() {
    var el = document.getElementById('ano-atual');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  document.addEventListener('DOMContentLoaded', function () {
    iniciarRelogio();
    definirSaudacao();
    anoAtualRodape();
  });
})();
